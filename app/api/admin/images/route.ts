import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob";
import { getAdminSession } from "@/lib/session";
import { getCarouselImages, addCarouselImage, deleteCarouselImage, setContent } from "@/lib/db";
import { validateCsrf } from "@/lib/csrf";

export async function GET() {
  const session = await getAdminSession();
  if (!session.isLoggedIn) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const images = await getCarouselImages();
    return Response.json(images);
  } catch (error) {
    console.error("Images GET error:", error);
    return Response.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const csrf = validateCsrf(request);
  if (!csrf.valid) {
    return Response.json({ error: csrf.error }, { status: 403 });
  }

  const session = await getAdminSession();
  if (!session.isLoggedIn) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Tipos MIME permitidos y sus magic bytes (primeros bytes del archivo)
  const ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  const MAGIC_BYTES: Record<string, number[][]> = {
    "image/jpeg": [[0xFF, 0xD8, 0xFF]],
    "image/png":  [[0x89, 0x50, 0x4E, 0x47]],
    "image/webp": [[0x52, 0x49, 0x46, 0x46]], // RIFF
    "image/gif":  [[0x47, 0x49, 0x46, 0x38]], // GIF8
  };

  const MAX_SIZE_MB = 10;
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const type = formData.get("type") as string | null;
    const width = parseInt(formData.get("width") as string) || 400;
    const height = parseInt(formData.get("height") as string) || 500;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    // Validar tamaño
    if (file.size > MAX_SIZE_BYTES) {
      return Response.json(
        { error: `El archivo supera el límite de ${MAX_SIZE_MB}MB.` },
        { status: 400 }
      );
    }

    // Validar tipo MIME declarado
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return Response.json(
        { error: "Tipo de archivo no permitido. Solo se aceptan JPG, PNG, WebP y GIF." },
        { status: 400 }
      );
    }

    // Validar magic bytes (tipo MIME real, no solo el declarado)
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer.slice(0, 8));
    const validSignatures = MAGIC_BYTES[file.type] ?? [];
    const isValidSignature = validSignatures.some((sig) =>
      sig.every((byte, i) => bytes[i] === byte)
    );

    if (!isValidSignature) {
      return Response.json(
        { error: "El archivo no corresponde al tipo declarado." },
        { status: 400 }
      );
    }

    const blob = await put(file.name, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    if (type === "blob-only") {
      // Upload to Blob only — caller is responsible for saving the URL via /api/admin/content
      return Response.json({ success: true, url: blob.url });
    } else if (type === "hero") {
      await setContent("hero_image_url", blob.url);
      revalidatePath("/");
      return Response.json({ success: true, url: blob.url });
    } else if (type === "events") {
      await setContent("events_image_url", blob.url);
      revalidatePath("/");
      return Response.json({ success: true, url: blob.url });
    } else {
      const image = await addCarouselImage(blob.url, file.name, width, height);
      revalidatePath("/");
      return Response.json({ success: true, image });
    }
  } catch (error) {
    console.error("Images POST error:", error);
    return Response.json({ error: "Failed to upload image" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const csrf = validateCsrf(request);
  if (!csrf.valid) {
    return Response.json({ error: csrf.error }, { status: 403 });
  }

  const session = await getAdminSession();
  if (!session.isLoggedIn) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();

    if (!id) {
      return Response.json({ error: "id required" }, { status: 400 });
    }

    const url = await deleteCarouselImage(Number(id));

    if (url && url.startsWith("http")) {
      try {
        await del(url, { token: process.env.BLOB_READ_WRITE_TOKEN });
      } catch (blobErr) {
        console.warn("Blob deletion failed:", blobErr);
      }
    }

    revalidatePath("/");
    return Response.json({ success: true });
  } catch (error) {
    console.error("Images DELETE error:", error);
    return Response.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
