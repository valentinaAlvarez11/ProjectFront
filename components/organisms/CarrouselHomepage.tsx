// components/organisms/CarrouselHomepage.tsx
<<<<<<< HEAD
"use client";
import React, { useState } from "react";
import Image from 'next/image';
=======
import Carousel from "../molecules/Carousel";
>>>>>>> 061eeea335d7e121eab784ed3091f8f38c10cb0a

const images = [
  "https://static.wixstatic.com/media/820831_a09d6a32b1604be084a86df021608ecd~mv2.jpg/v1/fit/w_739,h_541,q_90,enc_avif,quality_auto/820831_a09d6a32b1604be084a86df021608ecd~mv2.jpg",
  "https://static.wixstatic.com/media/820831_10c9b96c06f847368f80df8f1d3f03cc~mv2.jpg/v1/fit/w_739,h_541,q_90,enc_avif,quality_auto/820831_10c9b96c06f847368f80df8f1d3f03cc~mv2.jpg",
  "https://static.wixstatic.com/media/820831_b7cbcb946ea148889909a719055904ff~mv2.jpg/v1/fit/w_739,h_541,q_90,enc_avif,quality_auto/820831_b7cbcb946ea148889909a719055904ff~mv2.jpg",
  "https://static.wixstatic.com/media/820831_df25723fb969414f9a92a4933dbfd52f~mv2.jpg/v1/fit/w_739,h_541,q_90,enc_avif,quality_auto/820831_df25723fb969414f9a92a4933dbfd52f~mv2.jpg"
];

export default function CarrouselHomepage() {
  return (
<<<<<<< HEAD
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-screen max-h-[800px] overflow-hidden bg-white">
      <Image
        src={images[current]}
        alt={`slide-${current}`}
        fill
        className="object-cover object-center transition-opacity duration-500"
        priority={current === 0}
        loading={current === 0 ? "eager" : "lazy"}
      />
      <button
        onClick={prevSlide}
        className="
          absolute 
          top-1/2 
          left-2 sm:left-4 md:left-6 
          -translate-y-1/2 
          bg-black/40 
          hover:bg-black/60 
          text-white 
          border-none 
          rounded-full 
          w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
          text-lg sm:text-xl md:text-2xl 
          cursor-pointer 
          z-10 
          flex 
          items-center 
          justify-center 
          transition-all 
          duration-200
          focus:outline-none 
          focus:ring-2 
          focus:ring-white/50
        "
        aria-label="Anterior"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="
          absolute 
          top-1/2 
          right-2 sm:right-4 md:right-6 
          -translate-y-1/2 
          bg-black/40 
          hover:bg-black/60 
          text-white 
          border-none 
          rounded-full 
          w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
          text-lg sm:text-xl md:text-2xl 
          cursor-pointer 
          z-10 
          flex 
          items-center 
          justify-center 
          transition-all 
          duration-200
          focus:outline-none 
          focus:ring-2 
          focus:ring-white/50
        "
        aria-label="Siguiente"
      >
        &#8594;
      </button>
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`
              w-2 h-2 sm:w-3 sm:h-3 
              rounded-full 
              cursor-pointer 
              transition-all 
              duration-200
              ${current === idx 
                ? 'bg-[#00204A] border-2 border-[#E2C044] scale-125' 
                : 'bg-gray-300 hover:bg-gray-400 border-2 border-transparent'
              }
              focus:outline-none 
              focus:ring-2 
              focus:ring-white/50
            `}
            aria-label={`Ir a slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
=======
    <Carousel
      images={images}
      altText="Hotel Regatta Cartagena"
      height="100vh"
      showControls={true}
      showIndicators={true}
      autoPlay={true}
      autoPlayInterval={5000}
    />
>>>>>>> 061eeea335d7e121eab784ed3091f8f38c10cb0a
  );
}