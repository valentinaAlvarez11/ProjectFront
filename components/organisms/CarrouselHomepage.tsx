// components/organisms/CarrouselHomepage.tsx
"use client";
import React, { useState } from "react";
import Image from 'next/image';
import CarouselButton from '@/components/atoms/CarouselButton';
import CarouselIndicators from '@/components/atoms/CarouselIndicators';
import { carousel } from '@/utils/Tokens';

const images = [
  "https://static.wixstatic.com/media/820831_a09d6a32b1604be084a86df021608ecd~mv2.jpg/v1/fit/w_739,h_541,q_90,enc_avif,quality_auto/820831_a09d6a32b1604be084a86df021608ecd~mv2.jpg",
  "https://static.wixstatic.com/media/820831_10c9b96c06f847368f80df8f1d3f03cc~mv2.jpg/v1/fit/w_739,h_541,q_90,enc_avif,quality_auto/820831_10c9b96c06f847368f80df8f1d3f03cc~mv2.jpg",
  "https://static.wixstatic.com/media/820831_b7cbcb946ea148889909a719055904ff~mv2.jpg/v1/fit/w_739,h_541,q_90,enc_avif,quality_auto/820831_b7cbcb946ea148889909a719055904ff~mv2.jpg",
  "https://static.wixstatic.com/media/820831_df25723fb969414f9a92a4933dbfd52f~mv2.jpg/v1/fit/w_739,h_541,q_90,enc_avif,quality_auto/820831_df25723fb969414f9a92a4933dbfd52f~mv2.jpg"
];

export default function CarrouselHomepage() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  return (
    <div className={carousel.container}>
      <Image
        src={images[current]}
        alt={`slide-${current}`}
        fill
        className="object-cover object-center transition-opacity duration-500"
        priority={current === 0}
        loading={current === 0 ? "eager" : "lazy"}
      />
      <CarouselButton 
        direction="prev" 
        onClick={prevSlide} 
        ariaLabel="Anterior" 
      />
      <CarouselButton 
        direction="next" 
        onClick={nextSlide} 
        ariaLabel="Siguiente" 
      />
      <CarouselIndicators 
        total={images.length} 
        current={current} 
        onIndicatorClick={goToSlide} 
      />
    </div>
  );
}