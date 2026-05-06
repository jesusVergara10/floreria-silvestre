"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Our Work", href: "#our-work" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
];

export default function StickyNavBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      const target = document.getElementById("our-work");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      setVisible(rect.top < window.innerHeight);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-navy/10 px-10 py-4 flex items-center justify-between"
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
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-navy text-[1.1rem] tracking-widest uppercase hover:opacity-50 transition-opacity duration-200"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#order"
          className="text-navy text-[1.1rem] tracking-widest uppercase bg-blush px-6 py-2 rounded-full hover:opacity-70 transition-opacity duration-200"
        >
          Order
        </a>
      </div>
    </nav>
  );
}
