import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { sessionOptions, SessionData } from "@/lib/session";
import { getAllContent, setContent } from "@/lib/db";

async function getAdminSession() {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}

export async function GET() {
  const session = await getAdminSession();
  if (!session.isLoggedIn) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const content = await getAllContent();
    return Response.json(content);
  } catch (error) {
    console.error("Content GET error:", error);
    return Response.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session.isLoggedIn) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { key, value } = await request.json();

    if (!key || value === undefined) {
      return Response.json({ error: "key and value required" }, { status: 400 });
    }

    await setContent(key, value);
    revalidatePath("/");

    return Response.json({ success: true });
  } catch (error) {
    console.error("Content POST error:", error);
    return Response.json({ error: "Failed to update content" }, { status: 500 });
  }
}
