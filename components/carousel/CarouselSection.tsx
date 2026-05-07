import ImageCarousel from "./ImageCarousel";

const DRAG_INDICATORS = {
  left:  { positionClass: "left-0",  label: "< MOUSE DRAG" },
  right: { positionClass: "right-0", label: "MOUSE DRAG >" },
} as const;

function DragIndicator({ side }: { side: keyof typeof DRAG_INDICATORS }) {
  const { positionClass, label } = DRAG_INDICATORS[side];
  return (
    <div className={`absolute ${positionClass} top-1/2 -translate-y-1/2 z-10 pointer-events-none`}>
      <span className="bg-[#3d4232] text-white text-sm tracking-widest uppercase px-4 py-2 block">
        {label}
      </span>
    </div>
  );
}

export default function CarouselSection() {
  return (
    <section id="our-work" className="relative bg-white py-28 overflow-hidden">
      <DragIndicator side="left" />
      <DragIndicator side="right" />

      <ImageCarousel />

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
