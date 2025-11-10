// app/servicios/page.tsx
import HeroSection from "@/components/molecules/HeroSection";

export default function ServiciosPage() {
  return (
    <HeroSection
      imageUrl="https://static.wixstatic.com/media/820831_4badbe8289e54f299867565203d031e6~mv2.jpg/v1/fill/w_1143,h_900,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_4badbe8289e54f299867565203d031e6~mv2.jpg"
      imageAlt="Servicios del hotel"
      title="SERVICIOS"
      height="70vh"
      overlay={true}
      overlayOpacity={0.4}
    />
  );
}
