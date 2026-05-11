import Image from "next/image";
import CornerNavigation from "./CornerNavigation";
import MobileHeader from "./MobileHeader";
import { getSiteContent } from "@/lib/content";

function buildNavLinks(content: Record<string, string>) {
  return [
    {
      label: "Cotiza tu Evento",
      position: "top-left" as const,
      href: content.link_cotiza || "#contact",
      highlight: true,
      highlightColor: "#FFCCE7",
      highlightTextColor: "#000000",
      preserveCase: true,
    },
    {
      label: "WhatsApp",
      position: "top-right" as const,
      href: content.link_whatsapp || "#order",
      highlight: true,
      highlightColor: "#70CF3D",
      highlightTextColor: "#242424",
      preserveCase: true,
    },
  ];
}

function HeroPanel({ title, body, cotizaHref }: { title: string; body: string; cotizaHref: string }) {
  return (
    <div
      className="h-full flex flex-col items-center justify-center gap-8 px-12 text-center"
      style={{ backgroundColor: "#1C2D0E" }}
    >
      <div className="flex flex-col items-center gap-0">
        <div className="relative w-[194px] h-[38px]">
          <Image
            src="/images/hero/logo-claro.png"
            alt="Florería Silvestre"
            fill
            className="object-contain"
            priority
          />
        </div>

        <h1
          className="font-medium max-w-lg"
          style={{ color: "#C2E1A3", fontSize: "70px", lineHeight: "100%" }}
        >
          {title}
        </h1>
      </div>

      <p
        className="text-lg max-w-[470px]"
        style={{ color: "#C2E1A3", lineHeight: "120%" }}
      >
        {body}
      </p>

      <a
        href={cotizaHref}
        className="px-5 h-[43px] inline-flex items-center justify-center rounded-full border text-lg transition-all duration-300 hover:opacity-70"
        style={{ borderColor: "#C2E1A3", color: "#C2E1A3" }}
      >
        Cotiza tu Evento
      </a>
    </div>
  );
}

export default async function HeroSection() {
  const content = await getSiteContent();

  const navLinks = buildNavLinks(content);
  const mobileNavLinks = navLinks.map(({ label, href }) => ({ label, href }));
  const heroImage = content.hero_image_url;
  const heroTitle = content.hero_title;
  const heroBody = content.hero_body;
  const cotizaHref = content.link_cotiza;

  return (
    <section className="relative h-screen">
      <CornerNavigation links={navLinks} />

      <div className="hidden md:grid md:grid-cols-2 h-full">
        <div className="relative overflow-hidden">
          <Image
            src={heroImage}
            alt="Arreglo floral de Florería Silvestre"
            fill
            className="object-cover"
            priority
            unoptimized={heroImage.startsWith("http")}
          />
        </div>
        <HeroPanel title={heroTitle} body={heroBody} cotizaHref={cotizaHref} />
      </div>

      <div className="md:hidden flex flex-col h-full">
        <MobileHeader navLinks={mobileNavLinks} />
        <div className="relative flex-1 w-full">
          <Image
            src={heroImage}
            alt="Arreglo floral de Florería Silvestre"
            fill
            className="object-cover"
            priority
            unoptimized={heroImage.startsWith("http")}
          />
        </div>
      </div>
    </section>
  );
}
