"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Inicio",        href: "/admin" },
  { label: "Contenido",     href: "/admin/contenido" },
  { label: "Imágenes",      href: "/admin/imagenes" },
  { label: "Enlaces",       href: "/admin/enlaces" },
  { label: "Credenciales",  href: "/admin/credenciales" },
];

export default function AdminSidebar({ username }: { username?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function isActive(href: string) {
    return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
  }

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside
        className="hidden md:flex w-56 flex-shrink-0 flex-col border-r"
        style={{ backgroundColor: "#152208", borderColor: "#2a4012" }}
      >
        <div className="p-6 border-b" style={{ borderColor: "#2a4012" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero/logo-silvestre.svg" alt="Florería Silvestre" className="h-7 object-contain" />
          {username && (
            <p className="text-xs mt-2 opacity-60" style={{ color: "#C2E1A3" }}>{username}</p>
          )}
        </div>

        <nav className="flex-1 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-6 py-3 text-sm transition-colors duration-150"
              style={{
                color: isActive(item.href) ? "#ffffff" : "#C2E1A3",
                backgroundColor: isActive(item.href) ? "#1FA961" : "transparent",
              }}
            >
              {item.label}
            </Link>
          ))}
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

      {/* ── Mobile top bar ── */}
      <header
        className="md:hidden flex-shrink-0 border-b z-40"
        style={{ backgroundColor: "#152208", borderColor: "#2a4012" }}
      >
        <div className="flex items-center justify-between px-5 py-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero/logo-silvestre.svg" alt="Florería Silvestre" className="h-6 object-contain" />

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="flex flex-col justify-center gap-[5px] p-2"
          >
            <span
              className="block w-6 h-[1.5px] origin-center transition-transform duration-300"
              style={{
                backgroundColor: "#C2E1A3",
                transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block w-6 h-[1.5px] transition-opacity duration-300"
              style={{ backgroundColor: "#C2E1A3", opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-[1.5px] origin-center transition-transform duration-300"
              style={{
                backgroundColor: "#C2E1A3",
                transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>

        {menuOpen && (
          <nav
            className="border-t flex flex-col"
            style={{ borderColor: "#2a4012" }}
          >
            {username && (
              <p className="px-5 pt-3 pb-1 text-xs opacity-50" style={{ color: "#C2E1A3" }}>
                {username}
              </p>
            )}
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="px-5 py-3 text-sm transition-colors duration-150"
                style={{
                  color: isActive(item.href) ? "#ffffff" : "#C2E1A3",
                  backgroundColor: isActive(item.href) ? "#1FA961" : "transparent",
                }}
              >
                {item.label}
              </Link>
            ))}
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
          </nav>
        )}
      </header>
    </>
  );
}
