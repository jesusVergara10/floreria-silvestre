const NAV_LINKS = [
  { label: "Our Work", href: "#our-work" },
  { label: "Order",    href: "#order" },
  { label: "Events",   href: "#events" },
  { label: "Contact",  href: "#contact" },
];

export default function SiteFooter() {
  return (
    <footer id="contact" className="bg-[#1C2D0E]">
      <div className="flex items-center justify-center py-10 px-12 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero/logo-claro.png"
          alt="Florería Silvestre"
          className="w-full max-w-[260px] md:max-w-none h-auto"
        />
      </div>

      <div className="px-8 md:px-12 py-12 md:py-16 flex flex-col md:flex-row items-start md:justify-between gap-10 md:gap-12">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="text-white/60 text-lg leading-relaxed">
            <p>Cada flor tiene algo que decir.</p>
            <p>Nosotros la ayudamos a decirlo.</p>
          </div>
          <div className="flex flex-col gap-1 text-white/40 text-base">
            <p>Av. Álvaro Obregón 45, Roma Norte, CDMX</p>
            <p>hola@floreriasilvestre.com</p>
            <p>@floreriasilvestre</p>
          </div>
          <p className="text-white/20 text-sm">© Florería Silvestre</p>
        </div>

        <nav className="grid grid-cols-2 gap-x-10 gap-y-4 md:flex md:items-start md:gap-10 pt-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/60 text-base tracking-widest uppercase hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
