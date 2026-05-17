import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/session";
import { getAllContent, setContent } from "@/lib/db";
import { validateCsrf } from "@/lib/csrf";

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
  const csrf = validateCsrf(request);
  if (!csrf.valid) {
    return Response.json({ error: csrf.error }, { status: 403 });
  }

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
