import ImageCarousel from "./ImageCarousel";
import { getCarouselImages } from "@/lib/db";
import { getSiteContent } from "@/lib/content";

async function CarouselHeader({ title, body, disenaHref }: { title: string; body: string; disenaHref: string }) {
  return (
    <div className="text-center mb-14 px-6">
      <h2 className="text-4xl md:text-5xl font-medium mb-4" style={{ color: "#3F5A24" }}>
        {title}
      </h2>
      <p className="text-lg max-w-md mx-auto mb-8" style={{ color: "#3F5A24", lineHeight: "120%" }}>
        {body}
      </p>
      <a
        href={disenaHref}
        className="text-lg rounded-full h-[43px] px-5 inline-flex items-center justify-center mx-auto hover:opacity-80 transition-opacity duration-200"
        style={{ backgroundColor: "#C2E1A3", color: "#1C2D0E" }}
      >
        Diseña tu Bouquet
      </a>
    </div>
  );
}

const FALLBACK_IMAGES = [
  { id: 1, url: "/images/gallery/IMG_0807.JPG", filename: "IMG_0807.JPG", width: 300, height: 460, sort_order: 0 },
  { id: 2, url: "/images/gallery/fl2.jpg", filename: "fl2.jpg", width: 240, height: 350, sort_order: 1 },
  { id: 3, url: "/images/gallery/Despedida%20Susy%20Cerecero-12_Original.jpg", filename: "Despedida Susy Cerecero-12_Original.jpg", width: 320, height: 490, sort_order: 2 },
  { id: 4, url: "/images/gallery/IMG_0074.jpg", filename: "IMG_0074.jpg", width: 260, height: 380, sort_order: 3 },
  { id: 5, url: "/images/gallery/g006.JPG", filename: "g006.JPG", width: 280, height: 430, sort_order: 4 },
  { id: 6, url: "/images/gallery/Despedida%20Susy%20Cerecero-31.jpg", filename: "Despedida Susy Cerecero-31.jpg", width: 220, height: 340, sort_order: 5 },
  { id: 7, url: "/images/gallery/IMG_0313.JPG", filename: "IMG_0313.JPG", width: 310, height: 470, sort_order: 6 },
];

export default async function CarouselSection() {
  const [content, dbImages] = await Promise.all([
    getSiteContent(),
    getCarouselImages().catch(() => []),
  ]);

  const images = dbImages.length > 0 ? dbImages : FALLBACK_IMAGES;
  const title = content.carousel_title;
  const body = content.carousel_body;
  const disenaHref = content.link_disena;

  return (
    <section id="our-work" className="relative bg-white pt-28 pb-28 overflow-hidden">
      <CarouselHeader title={title} body={body} disenaHref={disenaHref} />
      <ImageCarousel images={images} />
    </section>
  );
}
