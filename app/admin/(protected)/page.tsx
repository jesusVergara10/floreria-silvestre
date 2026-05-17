import Link from "next/link";

const SECTIONS = [
  {
    label: "Contenido",
    href: "/admin/contenido",
    description: "Edita los textos del hero, carrusel, eventos y footer.",
  },
  {
    label: "Imágenes",
    href: "/admin/imagenes",
    description: "Sube y gestiona las imágenes del carrusel, hero y eventos.",
  },
  {
    label: "Enlaces",
    href: "/admin/enlaces",
    description: "Actualiza los links de WhatsApp, Cotiza, Diseña tu Bouquet e Instagram.",
  },
  {
    label: "Credenciales",
    href: "/admin/credenciales",
    description: "Cambia el usuario y contraseña del panel de administración.",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-medium mb-2" style={{ color: "#C2E1A3" }}>
        Bienvenido al panel
      </h1>
      <p className="text-sm mb-10 opacity-60" style={{ color: "#C2E1A3" }}>
        Gestiona el contenido de Florería Silvestre desde aquí.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="block p-6 rounded-xl border transition-all duration-200 hover:border-[#1FA961] hover:bg-[#1C2D0E]"
            style={{ backgroundColor: "#152208", borderColor: "#2a4012" }}
          >
            <h2 className="text-lg font-medium mb-1" style={{ color: "#C2E1A3" }}>
              {s.label}
            </h2>
            <p className="text-sm opacity-70" style={{ color: "#C2E1A3" }}>
              {s.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10 p-4 rounded-lg border text-sm" style={{ borderColor: "#2a4012", color: "#C2E1A3" }}>
        <strong>Primera vez?</strong> Visita{" "}
        <a href="/api/admin/init" target="_blank" className="underline hover:opacity-70">
          /api/admin/init
        </a>{" "}
        para inicializar la base de datos con el contenido por defecto.
      </div>
    </div>
  );
}
