import React from "react";
import Image from "next/image";

interface SectionWithImageProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  backgroundColor?: string;
  textColor?: string;
  imagePosition?: "left" | "right";
  minHeight?: string;
}

export default function SectionWithImage({
  title,
  description,
  imageUrl,
  imageAlt,
  backgroundColor = "#0a174e",
  textColor = "#fff",
  imagePosition = "right",
  minHeight = "460px",
}: SectionWithImageProps) {
  const isImageRight = imagePosition === "right";
  
  return (
    <div
      style={{
        width: "100vw",
        background: backgroundColor,
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "flex-start",
        minHeight: minHeight,
        margin: 0,
        position: "relative",
      }}
    >
      {/* Bloque de texto */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "40px",
          color: textColor,
          fontFamily: "inherit",
          minWidth: 0,
          order: isImageRight ? 1 : 2,
        }}
      >
        <h2
          style={{
            fontSize: "2.2rem",
            fontWeight: "500",
            marginBottom: "24px",
            fontFamily: "inherit",
            letterSpacing: "0.02em",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: "1.4rem",
            lineHeight: 1.7,
            fontFamily: "inherit",
          }}
        >
          {description}
        </p>
      </div>
      
      {/* Imagen */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: isImageRight ? "flex-end" : "flex-start",
          position: "relative",
          order: isImageRight ? 2 : 1,
        }}
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          style={{ objectFit: "cover", maxHeight: minHeight }}
        />
      </div>
    </div>
  );
}

