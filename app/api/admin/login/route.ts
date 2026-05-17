import { getIronSession } from "iron-session";
import { cookies, headers } from "next/headers";
import bcrypt from "bcryptjs";
import { sessionOptions, SessionData } from "@/lib/session";
import { getAdminCredentials } from "@/lib/db";
import { checkRateLimit, resetRateLimit } from "@/lib/rateLimit";
import { validateCsrf } from "@/lib/csrf";

export async function POST(request: Request) {
  const csrf = validateCsrf(request);
  if (!csrf.valid) {
    return Response.json({ error: csrf.error }, { status: 403 });
  }

  try {
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0].trim() ??
      headersList.get("x-real-ip") ??
      "unknown";

    const { allowed, retryAfterSeconds } = checkRateLimit(ip);
    if (!allowed) {
      return Response.json(
        { error: `Demasiados intentos. Intenta de nuevo en ${Math.ceil(retryAfterSeconds / 60)} minutos.` },
        {
          status: 429,
          headers: { "Retry-After": String(retryAfterSeconds) },
        }
      );
    }

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

    resetRateLimit(ip);

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
