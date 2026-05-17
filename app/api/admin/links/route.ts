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
    const { link_whatsapp, link_cotiza, link_disena } = await request.json();

    const updates: { key: string; value: string }[] = [];
    if (link_whatsapp !== undefined) updates.push({ key: "link_whatsapp", value: link_whatsapp });
    if (link_cotiza !== undefined) updates.push({ key: "link_cotiza", value: link_cotiza });
    if (link_disena !== undefined) updates.push({ key: "link_disena", value: link_disena });

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
