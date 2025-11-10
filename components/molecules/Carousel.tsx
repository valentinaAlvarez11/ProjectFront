"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface CarouselProps {
  images: string[];
  altText?: string;
  height?: string;
  showControls?: boolean;
  showIndicators?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function Carousel({
  images,
  altText = "Carousel image",
  height = "100vh",
  showControls = true,
  showIndicators = true,
  autoPlay = false,
  autoPlayInterval = 5000,
}: CarouselProps) {
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

  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, images.length]);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: height,
        margin: 0,
        borderRadius: 0,
        overflow: "hidden",
        boxShadow: "none",
        background: "#fff",
      }}
    >
      <Image
        src={images[current]}
        alt={`${altText} ${current + 1}`}
        fill
        style={{ objectFit: "cover", transition: "opacity 0.5s" }}
        priority={current === 0}
      />
      
      {showControls && (
        <>
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
              zIndex: 10,
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
              zIndex: 10,
            }}
            aria-label="Siguiente"
          >
            &#8594;
          </button>
        </>
      )}
      
      {showIndicators && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
            zIndex: 10,
          }}
        >
          {images.map((_, idx) => (
            <span
              key={idx}
              onClick={() => goToSlide(idx)}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: current === idx ? "#00204A" : "#d1d1d1",
                display: "inline-block",
                cursor: "pointer",
                border: current === idx ? "2px solid #E2C044" : "none",
              }}
              aria-label={`Ir a slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

