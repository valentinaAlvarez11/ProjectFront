import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Hotel Regatta Cartagena | Reservas Online",
    template: "%s | Hotel Regatta Cartagena",
  },
  description: "Hotel Regatta Cartagena ubicado frente a las playas de Bocagrande. Reserva online y disfruta de nuestras cómodas habitaciones con vista al mar.",
  keywords: ["hotel", "cartagena", "bocagrande", "reservas", "habitaciones", "playa"],
  authors: [{ name: "Hotel Regatta Cartagena" }],
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://hotelregatta.com",
    siteName: "Hotel Regatta Cartagena",
    title: "Hotel Regatta Cartagena | Reservas Online",
    description: "Hotel Regatta Cartagena ubicado frente a las playas de Bocagrande",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
