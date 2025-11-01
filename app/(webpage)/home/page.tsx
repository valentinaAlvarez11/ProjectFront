"use client";
// app/(webpage)/home/page
import CarrouselHomepage from "@/components/organisms/CarrouselHomepage";
import RoomCards from "@/components/organisms/ShowRoomCards";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HomePageClient() {
  return (
    <>
      <CarrouselHomepage />

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
            <Image src={"https://static.wixstatic.com/media/820831_5e26e7ba0e6f4da1a4413388c3fc1a36~mv2.png/v1/fill/w_120,h_120,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/free-wifi.png"} alt="Wifi" width={100} height={100} style={{ marginBottom: "10px" }} />
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
            <Image src={"https://static.wixstatic.com/media/820831_533e51163b814b2ab51561b825baa86a~mv2.png/v1/fill/w_144,h_144,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/820831_533e51163b814b2ab51561b825baa86a~mv2.png"} alt="Habitaciones familiares" width={100} height={100} style={{ marginBottom: "10px" }} />
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
            <Image src={"https://static.wixstatic.com/media/820831_ace526efee464b0e957e1ce362f696d3~mv2.png/v1/fill/w_150,h_144,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/820831_ace526efee464b0e957e1ce362f696d3~mv2.png"} alt="Room service" width={100} height={100} style={{ marginBottom: "10px" }} />
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
      {/* Sección Hotel Regatta cuida de ti con distribución de la imagen adjunta */}
      <div style={{
        width: "100vw",
        background: "#0a174e",
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "flex-start",
        minHeight: "460px",
        margin: 0,
        position: "relative"
      }}>
        {/* Bloque azul con texto, ocupa mitad izquierda */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "40px 40px 40px 40px",
          color: "#fff",
          fontFamily: "inherit",
          minWidth: 0
        }}>
          <h2 style={{ fontSize: "2.2rem", fontWeight: "500", marginBottom: "24px", fontFamily: 'inherit', letterSpacing: '0.02em' }}>Hotel Regatta cuida de ti</h2>
          <p style={{ fontSize: "1.4rem", lineHeight: 1.7, fontFamily: 'inherit' }}>
            Nos esforzamos para que vivas una experiencia única y de ensueño al estar frente a las playas de Bocagrande, por eso ponemos toda nuestra atención en el cuidado hacia ti y cumplimos con un estricto protocolo una vez ingresas a nuestro hotel.
          </p>
        </div>
        {/* Imagen ocupa mitad derecha */}
        <div style={{
          flex: 1,
          minWidth: 0,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          position: "relative"
        }}>
          <Image
            src="https://static.wixstatic.com/media/820831_c7cbafe210a64f37aa1362a9a0df7435~mv2.jpg/v1/fill/w_881,h_455,al_tr,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/820831_c7cbafe210a64f37aa1362a9a0df7435~mv2.jpg"
            alt="Hotel Regatta cuida de ti"
            fill
            style={{ objectFit: "cover", maxHeight: "460px" }}
          />
        </div>
      </div>
      {/* Sección de habitaciones */}
      <RoomCards />
    </>
  );
}
