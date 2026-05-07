import Image from "next/image";
import CornerNavigation from "./CornerNavigation";
import MobileHeader from "./MobileHeader";

const NAV_LINKS = [
  { label: "Our Work", position: "top-left" as const, href: "#our-work" },
  { label: "Order", position: "top-right" as const, href: "#order", highlight: true },
  { label: "Events", position: "bottom-left" as const, href: "#events" },
  { label: "Contact", position: "bottom-right" as const, href: "#contact" },
];

const MOBILE_NAV_LINKS = NAV_LINKS.map(({ label, href }) => ({ label, href }));

function HeroTagline() {
  return (
    <div className="hidden md:flex absolute inset-0 items-end justify-center z-10 pointer-events-none pb-24">
      <div
        className="text-center text-white pointer-events-auto px-6"
        style={{ textShadow: "0 2px 24px rgba(0,0,0,0.18)" }}
      >
        <p
          className="font-cormorant font-light leading-tight"
          style={{ fontSize: "clamp(2.16rem, 3.6vw, 3.78rem)" }}
        >
          Diseñamos y creamos con flores<br />
          para <em>bodas</em>, eventos y<br />
          experiencias <em>únicas</em>
        </p>
        <a
          href="#our-work"
          className="mt-6 inline-block text-sm tracking-[0.2em] uppercase border-b border-white/80 pb-px hover:border-white transition-colors"
        >
          Nuestro Trabajo
        </a>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative h-screen">
      <CornerNavigation links={NAV_LINKS} />
      <HeroTagline />

      <div className="hidden md:grid md:grid-cols-2 h-full">
        <div className="relative overflow-hidden">
          <Image
            src="/images/hero/01.JPG"
            alt="Arreglo floral de Florería Silvestre"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative overflow-hidden">
          <Image
            src="/images/hero/Silvestre-Estudio00001.jpg"
            alt="Florería Silvestre"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="md:hidden flex flex-col h-full">
        <MobileHeader navLinks={MOBILE_NAV_LINKS} />
        <div className="relative flex-1">
          <Image
            src="/images/hero/01.JPG"
            alt="Arreglo floral de Florería Silvestre"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
