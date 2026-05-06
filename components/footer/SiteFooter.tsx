const navLinks = [
  { label: "Our Work", href: "#our-work" },
  { label: "Order", href: "#order" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
];

export default function SiteFooter() {
  return (
    <footer id="contact">
      {/* Top: full-width logo on white */}
      <div className="bg-white flex items-center justify-center py-10 px-8 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero/logo-oscuro.png"
          alt="Florería Silvestre"
          className="w-full h-auto"
        />
      </div>

      {/* Bottom: black band */}
      <div className="bg-black px-12 py-16 flex items-start justify-between gap-12">
        {/* Left: tagline + contact info */}
        <div className="flex flex-col gap-8">
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

        {/* Right: nav links in a single row */}
        <nav className="flex items-start gap-10 pt-1">
          {navLinks.map((link) => (
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
