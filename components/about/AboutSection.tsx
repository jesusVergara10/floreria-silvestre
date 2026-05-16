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
      <div className="w-full md:w-1/2 flex items-center justify-center mb-10 md:mb-0 translate-x-[60px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={eventsImage}
          alt="Florería Silvestre — Eventos"
          className="w-[431px] h-[431px] md:w-[770px] md:h-[770px] object-cover"
        />
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
