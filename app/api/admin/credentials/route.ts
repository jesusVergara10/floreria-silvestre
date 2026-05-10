import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { sessionOptions, SessionData } from "@/lib/session";
import { getAdminCredentials, setAdminCredentials } from "@/lib/db";

export async function POST(request: Request) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
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
