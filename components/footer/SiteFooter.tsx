import { getSiteContent } from "@/lib/content";

export default async function SiteFooter() {
  const content = await getSiteContent();

  const tagline1 = content.footer_tagline1;
  const tagline2 = content.footer_tagline2;
  const address = content.footer_address;
  const email = content.footer_email;
  const whatsappHref = content.link_whatsapp;
  const cotizaHref = content.link_cotiza;
  const disenaHref = content.link_disena;
  const TEXT_COLOR = "#C2E1A3";

  const socialLinks = [
    { handle: content.instagram_handle, href: content.link_instagram },
    { handle: content.facebook_handle,  href: content.link_facebook  },
    { handle: content.tiktok_handle,    href: content.link_tiktok    },
    { handle: content.youtube_handle,   href: content.link_youtube   },
  ].filter((s) => s.handle);

  const navLinks = [
    { label: "Diseña tu Bouquet", href: disenaHref },
    { label: "Cotiza tu Evento", href: cotizaHref },
  ];

  return (
    <footer id="contact" className="bg-[#1C2D0E]">
      <div className="flex items-center justify-center pt-10 pb-0 px-12 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero/logo-silvestre.svg"
          alt="Florería Silvestre"
          className="w-full max-w-[260px] md:max-w-none h-auto"
        />
      </div>

      <div className="px-5 md:px-12 pt-4 pb-12 md:pt-6 md:pb-16 flex flex-col md:flex-row items-center md:items-start md:justify-between gap-10 md:gap-12">

        <nav className="flex flex-row flex-wrap justify-center items-center gap-4 md:flex-nowrap md:items-center md:gap-10 md:pt-1 order-1 md:order-2">
          <a
            href={navLinks[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base transition-colors duration-200 hover:opacity-60 order-1"
            style={{ color: TEXT_COLOR }}
          >
            {navLinks[0].label}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base rounded-full h-[43px] px-5 flex items-center justify-center transition-opacity duration-200 hover:opacity-70 order-2 md:order-3"
            style={{ backgroundColor: "#70CF3D", color: "#242424" }}
          >
            WhatsApp
          </a>
          <a
            href={navLinks[1].href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base transition-colors duration-200 hover:opacity-60 order-3 md:order-2"
            style={{ color: TEXT_COLOR }}
          >
            {navLinks[1].label}
          </a>
        </nav>

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
            {socialLinks.map((s) =>
              s.href ? (
                <a
                  key={s.handle}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity duration-200"
                  style={{ color: TEXT_COLOR }}
                >
                  {s.handle}
                </a>
              ) : (
                <span key={s.handle} style={{ color: TEXT_COLOR }}>{s.handle}</span>
              )
            )}
          </div>
          <p className="text-base" style={{ color: TEXT_COLOR }}>© Florería Silvestre</p>
        </div>

      </div>
    </footer>
  );
}
