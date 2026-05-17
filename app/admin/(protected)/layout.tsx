import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/session";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session.isLoggedIn) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ backgroundColor: "#1C2D0E" }}>
      <AdminSidebar username={session.username} />
      <main className="flex-1 p-5 md:p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
