

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
    <>
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
        <img
          src={images[current]}
          alt={`slide-${current}`}
          style={{
            width: "100vw",
            height: "100vh",
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
      {/* Sección de Comodidades */}
      <div style={{
        width: "100vw",
        background: "#fff",
        padding: "60px 0 40px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <h2 style={{
          fontSize: "3rem",
          fontWeight: "bold",
          letterSpacing: "0.3em",
          color: "#0a174e",
          marginBottom: "30px"
        }}>COMODIDADES</h2>
        <p style={{
          maxWidth: "1200px",
          textAlign: "center",
          fontSize: "1.5rem",
          color: "#233876",
          marginBottom: "50px",
          lineHeight: 1.6
        }}>
          Hotel Regatta Cartagena está ubicado frente a las playas de Bocagrande, a solo 5 minutos del centro histórico y rodeado de los mejores restaurantes, centros comerciales y discotecas de la ciudad, convirtiéndolo en el lugar ideal no solo para el descanso, sino para pasar grandes momentos de diversión en familia. Somos un hotel con ventilación natural, la brisa proveniente del Mar Caribe nos llevan a respirar con tranquilidad.
        </p>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "60px",
          flexWrap: "wrap"
        }}>
          {/* Wifi */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "300px" }}>
            <img src={"https://static.wixstatic.com/media/820831_5e26e7ba0e6f4da1a4413388c3fc1a36~mv2.png/v1/fill/w_120,h_120,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/free-wifi.png"} alt="Wifi" style={{ width: "100px", marginBottom: "10px" }} />
            <span style={{ fontSize: "2rem", fontWeight: "bold", letterSpacing: "0.1em", color: "#0a174e" }}>FREE</span>
            <div style={{
              background: "#0a174e",
              color: "#fff",
              borderRadius: "30px",
              padding: "12px 0",
              width: "80%",
              marginTop: "20px",
              textAlign: "center",
              fontSize: "1.3rem"
            }}>Wifi gratuito</div>
          </div>
          {/* Habitaciones familiares */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "300px" }}>
            <img src={"/assets/mercadolibre.png"} alt="Habitaciones familiares" style={{ width: "100px", marginBottom: "10px" }} />
            <span style={{ fontSize: "2rem", fontWeight: "bold", letterSpacing: "0.1em", color: "#0a174e" }}>&nbsp;</span>
            <div style={{
              background: "#0a174e",
              color: "#fff",
              borderRadius: "30px",
              padding: "12px 0",
              width: "80%",
              marginTop: "20px",
              textAlign: "center",
              fontSize: "1.3rem"
            }}>Habitaciones familiares</div>
          </div>
          {/* Room service */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "300px" }}>
            <img src={"/assets/mercadolibre1.png"} alt="Room service" style={{ width: "100px", marginBottom: "10px" }} />
            <span style={{ fontSize: "2rem", fontWeight: "bold", letterSpacing: "0.1em", color: "#0a174e" }}>&nbsp;</span>
            <div style={{
              background: "#0a174e",
              color: "#fff",
              borderRadius: "30px",
              padding: "12px 0",
              width: "80%",
              marginTop: "20px",
              textAlign: "center",
              fontSize: "1.3rem"
            }}>Room service</div>
          </div>
        </div>
      </div>
    </>
  );
}
