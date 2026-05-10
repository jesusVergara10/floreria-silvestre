"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Inicio", href: "/admin" },
  { label: "Contenido", href: "/admin/contenido" },
  { label: "Imágenes", href: "/admin/imagenes" },
  { label: "Enlaces", href: "/admin/enlaces" },
  { label: "Credenciales", href: "/admin/credenciales" },
];

export default function AdminSidebar({ username }: { username?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside
      className="w-56 flex-shrink-0 flex flex-col border-r"
      style={{ backgroundColor: "#152208", borderColor: "#2a4012" }}
    >
      <div className="p-6 border-b" style={{ borderColor: "#2a4012" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero/logo-claro.png"
          alt="Florería Silvestre"
          className="h-7 object-contain"
        />
        {username && (
          <p className="text-xs mt-2 opacity-60" style={{ color: "#C2E1A3" }}>
            {username}
          </p>
        )}
      </div>

      <nav className="flex-1 py-4">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-6 py-3 text-sm transition-colors duration-150"
              style={{
                color: isActive ? "#ffffff" : "#C2E1A3",
                backgroundColor: isActive ? "#1FA961" : "transparent",
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t" style={{ borderColor: "#2a4012" }}>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full py-2 text-sm rounded-lg border transition-opacity hover:opacity-70 disabled:opacity-50"
          style={{ borderColor: "#C2E1A3", color: "#C2E1A3" }}
        >
          {loggingOut ? "Saliendo..." : "Cerrar Sesión"}
        </button>
      </div>
    </aside>
  );
}
