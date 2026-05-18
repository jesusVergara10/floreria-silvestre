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
      {/* Header bar */}
      <header
        className="md:hidden flex items-center justify-between px-6 py-4 relative z-50 transition-colors duration-300"
        style={{
          backgroundColor: isOpen ? "#3F5A24" : "#ffffff",
          borderBottom: isOpen ? "none" : "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div className="relative w-40 h-10">
          <Image
            src="/images/hero/logo-silvestre.svg"
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
          {[
            isOpen ? "translateY(7.5px) rotate(45deg)" : "none",
            null,
            isOpen ? "translateY(-7.5px) rotate(-45deg)" : "none",
          ].map((transform, i) =>
            transform !== null ? (
              <span
                key={i}
                className="block w-7 h-[1.5px] origin-center transition-transform duration-300"
                style={{
                  backgroundColor: isOpen ? "#C2E1A3" : "#1C2D0E",
                  transform,
                }}
              />
            ) : (
              <span
                key={i}
                className="block w-7 h-[1.5px] transition-opacity duration-300"
                style={{
                  backgroundColor: isOpen ? "#C2E1A3" : "#1C2D0E",
                  opacity: isOpen ? 0 : 1,
                }}
              />
            )
          )}
        </button>
      </header>

      {/* Full-screen overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 flex flex-col px-8 pt-8 pb-16"
          style={{ backgroundColor: "#3F5A24" }}
        >
          {/* Nav items */}
          <nav className="flex-1 flex flex-col justify-center items-center gap-8 text-center">
            {navLinks.map((link) => {
              const isWhatsApp = link.label === "WhatsApp";
              return isWhatsApp ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="text-xl rounded-full h-[43px] px-6 flex items-center justify-center transition-opacity duration-200 hover:opacity-80"
                  style={{ backgroundColor: "#70CF3D", color: "#242424" }}
                >
                  WhatsApp
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-medium hover:opacity-60 transition-opacity duration-200"
                  style={{ color: "#C2E1A3" }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
