import Image from "next/image";
import { getSiteContent } from "@/lib/content";

export default async function AboutSection() {
  const content = await getSiteContent();

  const eventsTitle = content.events_title;
  const eventsBody = content.events_body;
  const eventsTagline = content.events_tagline;
  const eventsImage = content.events_image_url;
  const cotizaHref = content.link_cotiza;

  return (
    <section
      id="events"
      className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-[#3F5A24] py-20 md:py-0"
    >
      {/* clipPath rendered off-screen; referenced via url(#flower-clip) on the image wrapper below */}
      <svg width="0" height="0" className="absolute overflow-hidden">
        <defs>
          <clipPath id="flower-clip" clipPathUnits="objectBoundingBox">
            <path d="
              M 0.5,0.06
              C 0.62,0.02 0.78,0.12 0.76,0.28
              C 0.90,0.20 1.00,0.34 0.94,0.50
              C 1.00,0.66 0.90,0.80 0.76,0.72
              C 0.78,0.88 0.62,0.98 0.50,0.94
              C 0.38,0.98 0.22,0.88 0.24,0.72
              C 0.10,0.80 0.00,0.66 0.06,0.50
              C 0.00,0.34 0.10,0.20 0.24,0.28
              C 0.22,0.12 0.38,0.02 0.50,0.06 Z
            " />
          </clipPath>
        </defs>
      </svg>

      <div className="w-full md:w-1/2 flex items-center justify-center mb-10 md:mb-0">
        <div
          className="relative w-[392px] h-[392px] md:w-[700px] md:h-[700px]"
          style={{ clipPath: "url(#flower-clip)" }}
        >
          <Image
            src={eventsImage}
            alt="Florería Silvestre — Eventos"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 280px, 500px"
            unoptimized={eventsImage.startsWith("http")}
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center gap-6 px-8 md:px-20">
        <h2 className="text-3xl md:text-5xl font-medium text-center max-w-md" style={{ color: "#C2E1A3", lineHeight: "100%" }}>
          {eventsTitle}
        </h2>
        <p className="text-lg md:text-xl text-center max-w-md" style={{ color: "#C2E1A3", lineHeight: "120%" }}>
          {eventsBody}
        </p>
        <p className="text-lg md:text-xl text-center max-w-md" style={{ color: "#C2E1A3", fontFamily: "var(--font-fraunces-light-italic)", fontStyle: "italic", fontWeight: 300 }}>
          {eventsTagline}
        </p>
        <a
          href={cotizaHref}
          className="mt-4 px-5 h-[43px] inline-flex items-center justify-center rounded-full border text-lg transition-all duration-300"
          style={{ borderColor: "#C2E1A3", color: "#C2E1A3" }}
        >
          Cotiza tu Evento
        </a>
      </div>
    </section>
  );
}
