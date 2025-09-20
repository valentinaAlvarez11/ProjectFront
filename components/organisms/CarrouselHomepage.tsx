

"use client";
import React, { useState } from "react";

const images = [
  "https://static.wixstatic.com/media/820831_c1a822eeac9c491b82556da918086b59~mv2.png/v1/crop/x_183,y_223,w_686,h_627/fill/w_636,h_568,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/820831_c1a822eeac9c491b82556da918086b59~mv2.png",
  "https://static.wixstatic.com/media/820831_8a7dfaed785d4461aa1614b220f9b652~mv2.jpeg/v1/fill/w_1600,h_870,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_8a7dfaed785d4461aa1614b220f9b652~mv2.jpeg"
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
      width: "100%",
      maxWidth: "900px",
      margin: "40px auto",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
      background: "#fff"
    }}>
      <img
        src={images[current]}
        alt={`slide-${current}`}
        style={{
          width: "100%",
          height: "500px",
          objectFit: "cover",
          transition: "opacity 0.5s",
          display: "block"
        }}
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
          cursor: "pointer"
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
          cursor: "pointer"
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
        gap: "10px"
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
