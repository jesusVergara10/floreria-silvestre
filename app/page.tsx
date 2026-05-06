import HeroSection from "@/components/hero/HeroSection";
import StickyNavBar from "@/components/nav/StickyNavBar";
import CarouselSection from "@/components/carousel/CarouselSection";
import AboutSection from "@/components/about/AboutSection";
import SiteFooter from "@/components/footer/SiteFooter";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StickyNavBar />
      <CarouselSection />
      <AboutSection />
      <SiteFooter />
    </main>
  );
}
