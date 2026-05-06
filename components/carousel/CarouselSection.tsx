import ImageCarousel from "./ImageCarousel";

export default function CarouselSection() {
  return (
    <section
      id="our-work"
      className="relative bg-[#e2dfca] py-28 overflow-hidden"
    >
      {/* Drag indicators */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <span className="bg-[#3d4232] text-white text-sm tracking-widest uppercase px-4 py-2 block">
          &lt; MOUSE DRAG
        </span>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <span className="bg-[#3d4232] text-white text-sm tracking-widest uppercase px-4 py-2 block">
          MOUSE DRAG &gt;
        </span>
      </div>

      <ImageCarousel />

      {/* CTA */}
      <div className="mt-14 flex justify-end pr-12">
        <a
          href="#contact"
          className="text-navy text-2xl tracking-widest uppercase hover:opacity-50 transition-opacity duration-200"
        >
          GET IN TOUCH
        </a>
      </div>
    </section>
  );
}
