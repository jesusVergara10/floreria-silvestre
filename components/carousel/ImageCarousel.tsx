"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

const ITEMS = [
  { src: "/images/gallery/IMG_0807.JPG",                              width: 300, height: 460 },
  { src: "/images/gallery/fl2.jpg",                                   width: 240, height: 350 },
  { src: "/images/gallery/Despedida%20Susy%20Cerecero-12_Original.jpg", width: 320, height: 490 },
  { src: "/images/gallery/IMG_0074.jpg",                              width: 260, height: 380 },
  { src: "/images/gallery/g006.JPG",                                  width: 280, height: 430 },
  { src: "/images/gallery/Despedida%20Susy%20Cerecero-31.jpg",       width: 220, height: 340 },
  { src: "/images/gallery/IMG_0313.JPG",                              width: 310, height: 470 },
];

const SPEED = 0.45;

export default function ImageCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const halfWidthRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    halfWidthRef.current = track.scrollWidth / 2;

    const animate = () => {
      if (!isDraggingRef.current) {
        positionRef.current += SPEED;
        if (positionRef.current >= halfWidthRef.current) {
          positionRef.current -= halfWidthRef.current;
        }
        track.style.transform = `translateX(-${positionRef.current}px)`;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = positionRef.current;

    const onMouseMove = (ev: MouseEvent) => {
      let next = dragStartPosRef.current - (ev.clientX - dragStartXRef.current);
      const half = halfWidthRef.current;
      if (next < 0) next += half;
      if (next >= half) next -= half;
      positionRef.current = next;
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${next}px)`;
      }
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const allItems = [...ITEMS, ...ITEMS];

  return (
    <div
      className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseDown={onMouseDown}
    >
      <div
        ref={trackRef}
        className="flex items-center gap-3 will-change-transform"
      >
        {allItems.map((item, i) => (
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
