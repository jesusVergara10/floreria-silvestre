import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

function createDbClient() {
  return neon(process.env.DATABASE_URL!);
}

export async function initDatabase() {
  const db = createDbClient();
  await db`
    CREATE TABLE IF NOT EXISTS site_content (
      key VARCHAR PRIMARY KEY,
      value TEXT,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await db`
    CREATE TABLE IF NOT EXISTS carousel_images (
      id SERIAL PRIMARY KEY,
      url TEXT NOT NULL,
      filename VARCHAR NOT NULL,
      width INT DEFAULT 400,
      height INT DEFAULT 500,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await db`
    CREATE TABLE IF NOT EXISTS admin_credentials (
      id INT PRIMARY KEY DEFAULT 1,
      username VARCHAR NOT NULL,
      password_hash TEXT NOT NULL
    )
  `;
}

export async function seedDatabase() {
  const db = createDbClient();

  const contentRows: { key: string; value: string }[] = [
    { key: "hero_title", value: "Somos un estudio de diseño floral basado en Monterrey." },
    { key: "hero_body", value: "Modernos y en constante evolución, fusionamos tradiciones florales clásicas y contemporáneas para crear momentos memorables para personas y marcas." },
    { key: "hero_image_url", value: "/images/hero/01.JPG" },
    { key: "carousel_title", value: "Bouquets Personalizados" },
    { key: "carousel_body", value: "Cada bouquet es único, como la persona que lo recibe. Cuéntanos la ocasión y nosotros lo creamos con las flores perfectas para ese momento especial." },
    { key: "events_title", value: "Experiencias florales que perduran en la memoria." },
    { key: "events_body", value: "Trabajamos contigo para encontrar las flores, texturas y colores que mejor reflejen el espíritu de tu ocasión para hacerlo memorable." },
    { key: "events_tagline", value: "Porque cada momento merece su propia historia." },
    { key: "events_image_url", value: "/images/gallery/GIF-EVENTOS.gif" },
    { key: "footer_tagline1", value: "Cada flor tiene algo que decir." },
    { key: "footer_tagline2", value: "Nosotros la ayudamos a decirlo." },
    { key: "footer_address", value: "Av. Álvaro Obregón 45, Roma Norte, CDMX" },
    { key: "footer_email", value: "hola@floreriasilvestre.com" },
    { key: "footer_social", value: "@floreria_silvestre" },
    { key: "link_whatsapp", value: "https://wa.me/5218129805561" },
    { key: "link_cotiza", value: "https://forms.gle/9x55KYhYGTD72gSp9" },
    { key: "link_disena", value: "#our-work" },
  ];

  for (const row of contentRows) {
    await db`
      INSERT INTO site_content (key, value, updated_at)
      VALUES (${row.key}, ${row.value}, NOW())
      ON CONFLICT (key) DO NOTHING
    `;
  }

  const existingAdmin = await db`SELECT id FROM admin_credentials WHERE id = 1`;
  if (existingAdmin.length === 0) {
    const passwordHash = await bcrypt.hash("flor1324.", 12);
    await db`
      INSERT INTO admin_credentials (id, username, password_hash)
      VALUES (1, 'florsilvestre', ${passwordHash})
      ON CONFLICT (id) DO NOTHING
    `;
  }
}

export async function getAllContent(): Promise<Record<string, string>> {
  const db = createDbClient();
  const rows = await db`SELECT key, value FROM site_content`;
  const result: Record<string, string> = {};
  for (const row of rows) {
    result[row.key as string] = row.value as string;
  }
  return result;
}

export async function getContent(key: string): Promise<string | null> {
  const db = createDbClient();
  const rows = await db`SELECT value FROM site_content WHERE key = ${key}`;
  if (rows.length === 0) return null;
  return rows[0].value as string;
}

export async function setContent(key: string, value: string): Promise<void> {
  const db = createDbClient();
  await db`
    INSERT INTO site_content (key, value, updated_at)
    VALUES (${key}, ${value}, NOW())
    ON CONFLICT (key) DO UPDATE SET value = ${value}, updated_at = NOW()
  `;
}

export interface CarouselImage {
  id: number;
  url: string;
  filename: string;
  width: number;
  height: number;
  sort_order: number;
}

export async function getCarouselImages(): Promise<CarouselImage[]> {
  const db = createDbClient();
  const rows = await db`
    SELECT id, url, filename, width, height, sort_order
    FROM carousel_images
    ORDER BY sort_order ASC, created_at ASC
  `;
  return rows as CarouselImage[];
}

export async function addCarouselImage(
  url: string,
  filename: string,
  width: number,
  height: number
): Promise<CarouselImage> {
  const db = createDbClient();
  const rows = await db`
    INSERT INTO carousel_images (url, filename, width, height, sort_order)
    VALUES (${url}, ${filename}, ${width}, ${height}, 0)
    RETURNING id, url, filename, width, height, sort_order
  `;
  return rows[0] as CarouselImage;
}

export async function deleteCarouselImage(id: number): Promise<string | null> {
  const db = createDbClient();
  const rows = await db`
    DELETE FROM carousel_images WHERE id = ${id} RETURNING url
  `;
  if (rows.length === 0) return null;
  return rows[0].url as string;
}

export async function getAdminCredentials(): Promise<{ username: string; password_hash: string } | null> {
  const db = createDbClient();
  const rows = await db`SELECT username, password_hash FROM admin_credentials WHERE id = 1`;
  if (rows.length === 0) return null;
  return { username: rows[0].username as string, password_hash: rows[0].password_hash as string };
}

export async function setAdminCredentials(username: string, passwordHash: string): Promise<void> {
  const db = createDbClient();
  await db`
    INSERT INTO admin_credentials (id, username, password_hash)
    VALUES (1, ${username}, ${passwordHash})
    ON CONFLICT (id) DO UPDATE SET username = ${username}, password_hash = ${passwordHash}
  `;
}
