import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { sessionOptions, SessionData } from "@/lib/session";
import { getAdminCredentials } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return Response.json({ error: "Username and password required" }, { status: 400 });
    }

    const credentials = await getAdminCredentials();
    if (!credentials) {
      return Response.json({ error: "No admin account found. Run /api/admin/init first." }, { status: 401 });
    }

    const isValidUsername = credentials.username === username;
    const isValidPassword = await bcrypt.compare(password, credentials.password_hash);

    if (!isValidUsername || !isValidPassword) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    session.isLoggedIn = true;
    session.username = username;
    await session.save();

    return Response.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
