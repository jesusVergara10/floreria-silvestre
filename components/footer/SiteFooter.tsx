import { getSiteContent } from "@/lib/content";

export default async function SiteFooter() {
  const content = await getSiteContent();

  const tagline1 = content.footer_tagline1;
  const tagline2 = content.footer_tagline2;
  const address = content.footer_address;
  const email = content.footer_email;
  const social = content.footer_social;
  const whatsappHref = content.link_whatsapp;
  const cotizaHref = content.link_cotiza;
  const disenaHref = content.link_disena;

  const TEXT_COLOR = "#C2E1A3";

  const navLinks = [
    { label: "Diseña tu Bouquet", href: disenaHref },
    { label: "Cotiza tu Evento", href: cotizaHref },
  ];

  return (
    <footer id="contact" className="bg-[#1C2D0E]">
      {/* SVG filter: recolors white pixels to #C2E1A3 while preserving transparency */}
      <svg width="0" height="0" className="absolute overflow-hidden">
        <defs>
          <filter id="tint-logo-green">
            <feColorMatrix type="matrix" values="0 0 0 0 0.76  0 0 0 0 0.88  0 0 0 0 0.64  0 0 0 1 0" />
          </filter>
        </defs>
      </svg>

      <div className="flex items-center justify-center pt-10 pb-0 px-12 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero/logo-claro.png"
          alt="Florería Silvestre"
          className="w-full max-w-[260px] md:max-w-none h-auto"
          style={{ filter: "url(#tint-logo-green)" }}
        />
      </div>

      <div className="px-5 md:px-12 pt-4 pb-12 md:pt-6 md:pb-16 flex flex-col md:flex-row items-center md:items-start md:justify-between gap-10 md:gap-12">

        {/* Nav: aparece primero en mobile (order-1), a la derecha en desktop (order-2) */}
        <nav className="flex flex-row flex-wrap justify-center items-center gap-4 md:flex-nowrap md:items-center md:gap-10 md:pt-1 order-1 md:order-2">
          <a
            href={navLinks[0].href}
            className="text-base transition-colors duration-200 hover:opacity-60 order-1"
            style={{ color: TEXT_COLOR }}
          >
            {navLinks[0].label}
          </a>
          <a
            href={whatsappHref}
            className="text-base rounded-full h-[43px] px-5 flex items-center justify-center transition-opacity duration-200 hover:opacity-70 order-2 md:order-3"
            style={{ backgroundColor: "#70CF3D", color: "#242424" }}
          >
            WhatsApp
          </a>
          <a
            href={navLinks[1].href}
            className="text-base transition-colors duration-200 hover:opacity-60 order-3 md:order-2"
            style={{ color: TEXT_COLOR }}
          >
            {navLinks[1].label}
          </a>
        </nav>

        {/* Texto: aparece segundo en mobile (order-2), a la izquierda en desktop (order-1) */}
        <div className="flex flex-col gap-6 md:gap-8 items-center md:items-start text-center md:text-left order-2 md:order-1">
          <div
            className="text-base leading-relaxed"
            style={{
              color: TEXT_COLOR,
              fontFamily: "var(--font-fraunces-light-italic)",
              fontStyle: "italic",
              fontWeight: 300,
            }}
          >
            <p>{tagline1}</p>
            <p>{tagline2}</p>
          </div>
          <div className="flex flex-col gap-1 text-base items-center md:items-start" style={{ color: TEXT_COLOR }}>
            {address && <p>{address}</p>}
            {email && <p>{email}</p>}
            {social && <p>{social}</p>}
          </div>
          <p className="text-base" style={{ color: TEXT_COLOR }}>© Florería Silvestre</p>
        </div>

      </div>
    </footer>
  );
}
