import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/session";
import { setContent } from "@/lib/db";
import { validateCsrf } from "@/lib/csrf";

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
    const body = await request.json();

    const ALLOWED_KEYS = [
      "link_whatsapp", "link_cotiza", "link_disena",
      "instagram_handle", "link_instagram",
      "facebook_handle", "link_facebook",
      "tiktok_handle", "link_tiktok",
      "youtube_handle", "link_youtube",
    ];

    const updates: { key: string; value: string }[] = [];
    for (const key of ALLOWED_KEYS) {
      if (body[key] !== undefined) updates.push({ key, value: body[key] });
    }

    for (const { key, value } of updates) {
      await setContent(key, value);
    }

    revalidatePath("/");
    return Response.json({ success: true });
  } catch (error) {
    console.error("Links POST error:", error);
    return Response.json({ error: "Failed to update links" }, { status: 500 });
  }
}
