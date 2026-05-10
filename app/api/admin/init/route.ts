import { initDatabase, seedDatabase } from "@/lib/db";

export async function GET() {
  try {
    await initDatabase();
    await seedDatabase();
    return Response.json({ success: true, message: "Database initialized and seeded." });
  } catch (error) {
    console.error("Init error:", error);
    return Response.json({ error: "Failed to initialize database" }, { status: 500 });
  }
}
