import CarrouselHomepage from "@/components/organisms/CarrouselHomepage";
import RoomCards from "@/components/organisms/ShowRoomCards";
import Image from 'next/image';
import React from 'react';

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
            <Image
              src="https://static.wixstatic.com/media/820831_5e26e7ba0e6f4da1a4413388c3fc1a36~mv2.png/v1/fill/w_120,h_120,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/free-wifi.png"
              alt="Wifi"
              width={120}
              height={120}
              style={{ marginBottom: "10px" }}
            />
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
            <Image
              src="https://static.wixstatic.com/media/820831_533e51163b814b2ab51561b825baa86a~mv2.png/v1/fill/w_144,h_144,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/820831_533e51163b814b2ab51561b825baa86a~mv2.png"
              alt="Habitaciones familiares"
              width={144}
              height={144}
              style={{ marginBottom: "10px" }}
            />
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
            <Image
              src="https://static.wixstatic.com/media/820831_ace526efee464b0e957e1ce362f696d3~mv2.png/v1/fill/w_150,h_144,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/820831_ace526efee464b0e957e1ce362f696d3~mv2.png"
              alt="Room service"
              width={150}
              height={144}
              style={{ marginBottom: "10px" }}
            />
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
      {/* Sección de habitaciones */}
      <RoomCards />
    </>
  );
}
