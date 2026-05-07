import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="events"
      className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-[#3F5A24] py-20 md:py-0"
    >
      {/* Hidden SVG that defines the flower-shaped clipping mask used below */}
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
          className="relative w-[280px] h-[280px] md:w-[500px] md:h-[500px]"
          style={{ clipPath: "url(#flower-clip)" }}
        >
          <Image
            src="/images/gallery/fl2.jpg"
            alt="Florería Silvestre — Eventos"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 280px, 500px"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center gap-8 md:gap-10 px-8 md:px-20">
        <a
          href="#contact"
          className="px-10 py-3 rounded-full bg-[#1c1c0e] text-white text-xl tracking-widest uppercase transition-all duration-300 hover:bg-transparent hover:text-black"
        >
          Eventos
        </a>
        <div className="max-w-md text-center space-y-6">
          <p className="text-white text-lg md:text-xl leading-relaxed">
            Transformamos tus celebraciones en experiencias florales que perduran en la memoria. Desde bodas íntimas hasta grandes eventos corporativos, cada arreglo es diseñado a tu medida.
          </p>
          <p className="text-white text-lg md:text-xl leading-relaxed">
            Trabajamos contigo para encontrar las flores, texturas y colores que mejor reflejen el espíritu de tu ocasión — porque cada momento merece su propia historia.
          </p>
        </div>
      </div>
    </section>
  );
}
