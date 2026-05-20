"use client";

import { useRef, useEffect } from "react";

export interface CarouselImageItem {
  id: number;
  url: string;
  filename: string;
  width: number;
  height: number;
  sort_order?: number;
}

const SCROLL_SPEED = 0.45;
const HEIGHTS = [500, 360, 440, 320, 480, 380, 420];

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

    const tick = () => {
      // Recalculate every frame so natural image widths are respected after load
      halfWidthRef.current = track.scrollWidth / 2;

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

interface ImageCarouselProps {
  images: CarouselImageItem[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  // Duplicate items for seamless infinite loop
  const loopedItems = [...images, ...images];

  const { trackRef, onDragStart, onTouchStart } = useCarouselScroll(SCROLL_SPEED);

  return (
    <div
      className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseDown={onDragStart}
      onTouchStart={onTouchStart}
    >
      <div ref={trackRef} className="flex items-center gap-[66px] will-change-transform">
        {loopedItems.map((item, i) => {
          const height = HEIGHTS[item.id % HEIGHTS.length];
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${item.id}-${i}`}
              src={item.url}
              alt=""
              draggable={false}
              className="flex-shrink-0 w-auto"
              style={{ height }}
            />
          );
        })}
      </div>
    </div>
  );
}
