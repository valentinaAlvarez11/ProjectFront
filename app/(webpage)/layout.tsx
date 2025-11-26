//webpage layout
import type { Metadata } from "next";
import HeaderComponent from "@/components/organisms/HeaderComponent";
import { AuthInitializer } from "@/components/organisms/AuthInitializer";
import FooterBooking from "@/components/organisms/FooterBooking";

export const metadata: Metadata = {
  title: "Hotel Regatta Cartagena",
  description: "Hotel Regatta Cartagena ubicado frente a las playas de Bocagrande. Reserva online y disfruta de nuestras cómodas habitaciones con vista al mar.",
};

export default function WebpageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthInitializer>
        <HeaderComponent />
        <main>
          {children}
        </main>
        <FooterBooking />
      </AuthInitializer>
    </>
  );
}
