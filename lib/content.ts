import { getAllContent } from "@/lib/db";

const SITE_CONTENT_DEFAULTS: Record<string, string> = {
  hero_title: "Somos un estudio de diseño floral basado en Monterrey.",
  hero_body:
    "Modernos y en constante evolución, fusionamos tradiciones florales clásicas y contemporáneas para crear momentos memorables para personas y marcas.",
  hero_image_url: "/images/hero/01.JPG",
  carousel_title: "Bouquets Personalizados",
  carousel_body:
    "Cada bouquet es único, como la persona que lo recibe. Cuéntanos la ocasión y nosotros lo creamos con las flores perfectas para ese momento especial.",
  events_title: "Experiencias florales que perduran en la memoria.",
  events_body:
    "Trabajamos contigo para encontrar las flores, texturas y colores que mejor reflejen el espíritu de tu ocasión para hacerlo memorable.",
  events_tagline: "Porque cada momento merece su propia historia.",
  events_image_url: "/images/gallery/GIF-EVENTOS.gif",
  footer_tagline1: "Cada flor tiene algo que decir.",
  footer_tagline2: "Nosotros la ayudamos a decirlo.",
  footer_address: "Av. Álvaro Obregón 45, Roma Norte, CDMX",
  footer_email: "hola@floreriasilvestre.com",
  footer_social: "@floreria_silvestre",
  link_whatsapp: "https://wa.me/5218129805561",
  link_cotiza: "https://forms.gle/9x55KYhYGTD72gSp9",
  link_disena: "#our-work",
};

/**
 * Fetches all site content from the DB and merges with defaults as fallback.
 * Safe to call from any server component — never throws.
 */
export async function getSiteContent(): Promise<Record<string, string>> {
  try {
    const dbContent = await getAllContent();
    return { ...SITE_CONTENT_DEFAULTS, ...dbContent };
  } catch {
    return { ...SITE_CONTENT_DEFAULTS };
  }
}
