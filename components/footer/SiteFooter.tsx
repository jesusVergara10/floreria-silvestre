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
      <div className="flex items-center justify-center pt-10 pb-0 px-12 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero/logo-claro.png"
          alt="Florería Silvestre"
          className="w-full max-w-[260px] md:max-w-none h-auto"
        />
      </div>

      <div className="px-5 md:px-12 pt-4 pb-12 md:pt-6 md:pb-16 flex flex-col md:flex-row items-start md:justify-between gap-10 md:gap-12">
        <div className="flex flex-col gap-6 md:gap-8">
          <div
            className="text-lg leading-relaxed"
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
          <div className="flex flex-col gap-1 text-base" style={{ color: TEXT_COLOR }}>
            {address && <p>{address}</p>}
            {email && <p>{email}</p>}
            {social && <p>{social}</p>}
          </div>
          <p className="text-sm" style={{ color: TEXT_COLOR }}>© Florería Silvestre</p>
        </div>

        <nav className="grid grid-cols-2 gap-x-10 gap-y-4 md:flex md:items-center md:gap-10 pt-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-base uppercase transition-colors duration-200 hover:opacity-60"
              style={{ color: TEXT_COLOR }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappHref}
            className="text-base rounded-full h-[43px] px-5 flex items-center justify-center transition-opacity duration-200 hover:opacity-70"
            style={{ backgroundColor: "#70CF3D", color: "#242424" }}
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </footer>
  );
}
