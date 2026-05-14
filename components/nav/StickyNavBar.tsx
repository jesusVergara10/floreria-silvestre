"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Diseña tu Bouquet", href: "#our-work", preserveCase: true },
  { label: "Cotiza tu Evento",  href: "#events",   preserveCase: true },
];

function useSectionInView(sectionId: string) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const section = document.getElementById(sectionId);
      if (!section) return;
      setInView(section.getBoundingClientRect().top < window.innerHeight);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, [sectionId]);

  return inView;
}

export default function StickyNavBar() {
  const visible = useSectionInView("our-work");

  return (
    <nav
      className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-white border-b border-navy/10 px-10 py-4 items-center justify-between"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div className="relative w-44 h-10">
        <Image
          src="/images/hero/logo-oscuro.png"
          alt="Florería Silvestre"
          fill
          className="object-contain object-left"
          priority
        />
      </div>

      <div className="flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-navy text-[1.1rem] hover:opacity-50 transition-opacity duration-200"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#order"
          className="text-[1.1rem] rounded-full h-[43px] px-5 flex items-center justify-center hover:opacity-70 transition-opacity duration-200"
          style={{ backgroundColor: "#70CF3D", color: "#242424" }}
        >
          WhatsApp
        </a>
      </div>
    </nav>
  );
}
