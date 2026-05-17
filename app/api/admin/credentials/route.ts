import bcrypt from "bcryptjs";
import { getAdminSession } from "@/lib/session";
import { getAdminCredentials, setAdminCredentials } from "@/lib/db";
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
    const { username, newPassword, currentPassword } = await request.json();

    if (!currentPassword) {
      return Response.json({ error: "Current password is required" }, { status: 400 });
    }

    const credentials = await getAdminCredentials();
    if (!credentials) {
      return Response.json({ error: "No credentials found" }, { status: 500 });
    }

    const isValid = await bcrypt.compare(currentPassword, credentials.password_hash);
    if (!isValid) {
      return Response.json({ error: "Current password is incorrect" }, { status: 401 });
    }

    const updatedUsername = username || credentials.username;
    const updatedHash = newPassword
      ? await bcrypt.hash(newPassword, 12)
      : credentials.password_hash;

    await setAdminCredentials(updatedUsername, updatedHash);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Credentials POST error:", error);
    return Response.json({ error: "Failed to update credentials" }, { status: 500 });
  }
}
