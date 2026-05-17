import HeroSection from "@/components/hero/HeroSection";
import StickyNavBar from "@/components/nav/StickyNavBar";
import CarouselSection from "@/components/carousel/CarouselSection";
import AboutSection from "@/components/about/AboutSection";
import SiteFooter from "@/components/footer/SiteFooter";
import FloatingFlower from "@/components/ui/FloatingFlower";
import { getSiteContent } from "@/lib/content";

export default async function Home() {
  const content = await getSiteContent();

  return (
    <main>
      <HeroSection />
      <StickyNavBar whatsappHref={content.link_whatsapp} cotizaHref={content.link_cotiza} />
      <CarouselSection />
      <AboutSection />
      <SiteFooter />
      <FloatingFlower />
    </main>
  );
}
