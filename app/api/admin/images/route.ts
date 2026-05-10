import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob";
import { sessionOptions, SessionData } from "@/lib/session";
import { getCarouselImages, addCarouselImage, deleteCarouselImage, setContent } from "@/lib/db";

async function getAdminSession() {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}

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
  const session = await getAdminSession();
  if (!session.isLoggedIn) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const type = formData.get("type") as string | null;
    const width = parseInt(formData.get("width") as string) || 400;
    const height = parseInt(formData.get("height") as string) || 500;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const blob = await put(file.name, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    if (type === "hero") {
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
