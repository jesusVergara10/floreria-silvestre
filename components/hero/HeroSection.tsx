import Image from "next/image";
import CornerNavigation from "./CornerNavigation";
import MobileHeader from "./MobileHeader";

const navLinks = [
  { label: "Our Work", position: "top-left" as const, href: "#our-work" },
  { label: "Order", position: "top-right" as const, href: "#order", highlight: true },
  { label: "Events", position: "bottom-left" as const, href: "#events" },
  { label: "Contact", position: "bottom-right" as const, href: "#contact" },
];

const mobileNavLinks = navLinks.map(({ label, href }) => ({ label, href }));

export default function HeroSection() {
  return (
    <section className="relative h-screen">
      {/* Desktop: corner links overlay */}
      <CornerNavigation links={navLinks} />

      {/* Desktop: split layout */}
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

        <div className="relative bg-cream flex items-center justify-center">
          <div className="relative w-64 h-24">
            <Image
              src="/images/hero/logo-oscuro.png"
              alt="Florería Silvestre"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Mobile: stacked layout */}
      <div className="md:hidden flex flex-col h-full">
        <MobileHeader navLinks={mobileNavLinks} />
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
