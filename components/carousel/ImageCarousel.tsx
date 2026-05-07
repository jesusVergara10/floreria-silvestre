"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

const GALLERY_ITEMS = [
  { src: "/images/gallery/IMG_0807.JPG",                                width: 300, height: 460 },
  { src: "/images/gallery/fl2.jpg",                                     width: 240, height: 350 },
  { src: "/images/gallery/Despedida%20Susy%20Cerecero-12_Original.jpg", width: 320, height: 490 },
  { src: "/images/gallery/IMG_0074.jpg",                                width: 260, height: 380 },
  { src: "/images/gallery/g006.JPG",                                    width: 280, height: 430 },
  { src: "/images/gallery/Despedida%20Susy%20Cerecero-31.jpg",         width: 220, height: 340 },
  { src: "/images/gallery/IMG_0313.JPG",                                width: 310, height: 470 },
];

// Duplicated to create a seamless infinite loop
const LOOPED_ITEMS = [...GALLERY_ITEMS, ...GALLERY_ITEMS];

const SCROLL_SPEED = 0.45;

function useCarouselScroll(speed: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const halfWidthRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    halfWidthRef.current = track.scrollWidth / 2;

    const tick = () => {
      if (!isDraggingRef.current) {
        positionRef.current += speed;
        if (positionRef.current >= halfWidthRef.current) {
          positionRef.current -= halfWidthRef.current;
        }
        track.style.transform = `translateX(-${positionRef.current}px)`;
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current);
    };
  }, [speed]);

  const applyDrag = (currentX: number) => {
    const half = halfWidthRef.current;
    let next = dragStartPosRef.current - (currentX - dragStartXRef.current);
    if (next < 0) next += half;
    if (next >= half) next -= half;
    positionRef.current = next;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${next}px)`;
    }
  };

  const onDragStart = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = positionRef.current;

    const onMove = (ev: MouseEvent) => applyDrag(ev.clientX);
    const onUp = () => {
      isDraggingRef.current = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.touches[0].clientX;
    dragStartPosRef.current = positionRef.current;

    const onMove = (ev: TouchEvent) => applyDrag(ev.touches[0].clientX);
    const onEnd = () => {
      isDraggingRef.current = false;
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
    };

    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("touchend", onEnd);
  };

  return { trackRef, onDragStart, onTouchStart };
}

export default function ImageCarousel() {
  const { trackRef, onDragStart, onTouchStart } = useCarouselScroll(SCROLL_SPEED);

  return (
    <div
      className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseDown={onDragStart}
      onTouchStart={onTouchStart}
    >
      <div ref={trackRef} className="flex items-center gap-3 will-change-transform">
        {LOOPED_ITEMS.map((item, i) => (
          <div
            key={i}
            className="relative flex-shrink-0"
            style={{ width: item.width, height: item.height }}
          >
            <Image
              src={item.src}
              alt=""
              fill
              className="object-cover"
              draggable={false}
              sizes="320px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
