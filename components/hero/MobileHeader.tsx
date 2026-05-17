"use client";

import { useState } from "react";
import Image from "next/image";

interface NavLink {
  label: string;
  href: string;
}

interface MobileHeaderProps {
  navLinks: NavLink[];
}

export default function MobileHeader({ navLinks }: MobileHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-navy/10">
        <div className="relative w-40 h-10">
          <Image
            src="/images/hero/logo-oscuro.png"
            alt="Florería Silvestre"
            fill
            className="object-contain object-left"
            priority
          />
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          className="flex flex-col justify-center gap-[6px] p-2"
        >
          <span
            className={`block w-7 h-[1.5px] bg-navy origin-center transition-transform duration-300 ${
              isOpen ? "translate-y-[7.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-7 h-[1.5px] bg-navy transition-opacity duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-7 h-[1.5px] bg-navy origin-center transition-transform duration-300 ${
              isOpen ? "-translate-y-[7.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </header>

      {isOpen && (
        <nav className="md:hidden absolute top-[66px] left-0 right-0 z-20 bg-white border-b border-navy/10 px-8 py-8 flex flex-col gap-6 shadow-sm">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
              onClick={() => setIsOpen(false)}
              className="text-navy text-2xl tracking-widest uppercase hover:opacity-50 transition-opacity duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </>
  );
}
