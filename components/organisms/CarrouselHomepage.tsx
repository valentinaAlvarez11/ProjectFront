// components/organisms/CarrouselHomepage.tsx
import Carousel from "../molecules/Carousel";

const images = [
  "https://static.wixstatic.com/media/820831_c1a822eeac9c491b82556da918086b59~mv2.png/v1/crop/x_183,y_223,w_686,h_627/fill/w_636,h_568,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/820831_c1a822eeac9c491b82556da918086b59~mv2.png",
  "https://static.wixstatic.com/media/820831_8a7dfaed785d4461aa1614b220f9b652~mv2.jpeg/v1/fill/w_1600,h_870,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_8a7dfaed785d4461aa1614b220f9b652~mv2.jpeg"
];

export default function CarrouselHomepage() {
  return (
    <Carousel
      images={images}
      altText="Hotel Regatta Cartagena"
      height="100vh"
      showControls={true}
      showIndicators={true}
      autoPlay={true}
      autoPlayInterval={5000}
    />
  );
}