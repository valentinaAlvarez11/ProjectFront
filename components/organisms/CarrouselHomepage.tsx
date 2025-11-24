// components/organisms/CarrouselHomepage.tsx
"use client";
import React, { useState } from "react";
import Image from 'next/image';

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

  return (
    <div style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      margin: 0,
      borderRadius: 0,
      overflow: "hidden",
      boxShadow: "none",
      background: "#fff"
    }}>
      <Image
        src={images[current]}
        alt={`slide-${current}`}
        fill
        style={{ objectFit: "cover", objectPosition: "50% 50%", transition: "opacity 0.5s" }}
        priority={current === 0}
        loading={current === 0 ? "eager" : "lazy"}
      />
      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          top: "50%",
          left: "20px",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.4)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          fontSize: "24px",
          cursor: "pointer",
          zIndex: 10
        }}
        aria-label="Anterior"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        style={{
          position: "absolute",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.4)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          fontSize: "24px",
          cursor: "pointer",
          zIndex: 10
        }}
        aria-label="Siguiente"
      >
        &#8594;
      </button>
      <div style={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "10px",
        zIndex: 10
      }}>
        {images.map((_, idx) => (
          <span
            key={idx}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: current === idx ? "#00204A" : "#d1d1d1",
              display: "inline-block",
              cursor: "pointer",
              border: current === idx ? "2px solid #E2C044" : "none"
            }}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
}