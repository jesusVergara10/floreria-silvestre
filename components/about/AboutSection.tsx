import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="events"
      className="flex items-center justify-center min-h-screen bg-[#b8d4e6]"
    >
      {/* SVG clip path definition — invisible, just defines the mask */}
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

      {/* Left: flower-masked photo */}
      <div className="w-1/2 flex items-center justify-center">
        <div
          className="relative w-[500px] h-[500px]"
          style={{ clipPath: "url(#flower-clip)" }}
        >
          <Image
            src="/images/gallery/fl2.jpg"
            alt="Florería Silvestre — Eventos"
            fill
            className="object-cover"
            sizes="500px"
          />
        </div>
      </div>

      {/* Right: button + description */}
      <div className="w-1/2 flex flex-col items-center gap-10 px-20">
        <a
          href="#contact"
          className="px-10 py-3 rounded-full bg-[#1c1c0e] text-white text-xl tracking-widest uppercase transition-all duration-300 hover:bg-transparent hover:text-black"
        >
          Eventos
        </a>

        <div className="max-w-md text-center space-y-6">
          <p className="text-[#1a2744] text-xl leading-relaxed">
            Transformamos tus celebraciones en experiencias florales que perduran en la memoria. Desde bodas íntimas hasta grandes eventos corporativos, cada arreglo es diseñado a tu medida.
          </p>
          <p className="text-[#1a2744] text-xl leading-relaxed">
            Trabajamos contigo para encontrar las flores, texturas y colores que mejor reflejen el espíritu de tu ocasión — porque cada momento merece su propia historia.
          </p>
        </div>
      </div>
    </section>
  );
}
