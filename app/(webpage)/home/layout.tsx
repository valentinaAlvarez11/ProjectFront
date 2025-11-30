import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regatta Hotel | Home",
  description: "Hotel Regatta Cartagena está ubicado frente a las playas de Bocagrande, a solo 5 minutos del centro histórico y rodeado de los mejores restaurantes, centros comerciales y discotecas de la ciudad, convirtiéndolo en el lugar ideal no solo para el descanso, sino para pasar grandes momentos de diversión en familia.",
  keywords: ["Hotel Regatta", "Cartagena", "Bocagrande", "hotel", "reservas", "Caribe", "playa"],
  openGraph: {
    title: "Regatta Hotel | Home",
    description: "Hotel Regatta Cartagena está ubicado frente a las playas de Bocagrande, a solo 5 minutos del centro histórico.",
    type: "website",
  },
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

