
import Image from "next/image";

export default function HeaderComponent() {
  return (
    <header className="bg-[#0a1445] w-full font-sans border-b-[3px] border-[#b6a253]">
      <div className="flex items-center justify-between max-w-[1400px] mx-auto px-8 py-6">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="https://static.wixstatic.com/media/820831_c1a822eeac9c491b82556da918086b59~mv2.png/v1/crop/x_185,y_232,w_649,h_602/fill/w_222,h_200,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/LOGO-SIN-FONDO.png" alt="Hotel Regatta Cartagena" width={120} height={100} />
          <div className="ml-4">
            <div className="text-[#b6a253] text-lg tracking-[0.3em] font-light">HOTEL</div>
            <div className="text-[#b6a253] text-2xl font-light tracking-[0.3em]">REGATTA</div>
            <div className="text-[#b6a253] text-xs tracking-[0.2em]">CARTAGENA</div>
          </div>
        </div>
        {/* Navigation */}
        <nav className="flex items-center gap-16">
          <a href="/" className="text-[#b6a253] text-lg font-light border-r border-[#b6a253] pr-8">Inicio</a>
          <a href="/reservas" className="text-white text-lg font-light border-r border-[#b6a253] pr-8 pl-8">Reservas</a>
          <a href="/servicios" className="text-white text-lg font-light border-r border-[#b6a253] pr-8 pl-8">Servicios</a>
          <a href="/restaurante-bar" className="text-white text-lg font-light border-r border-[#b6a253] pr-8 pl-8">Restaurante &amp; Bar</a>
          <a href="/politicas" className="text-white text-lg font-light pl-8">Políticas y reglas</a>
        </nav>
      </div>
    </header>
  );
}
