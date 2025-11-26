//webpage layout
import type { Metadata } from "next";
import HeaderComponent from "@/components/organisms/HeaderComponent";
<<<<<<< HEAD
import { AuthInitializer } from "@/components/organisms/AuthInitializer";
=======
import FooterBooking from "@/components/organisms/FooterBooking";
>>>>>>> 061eeea335d7e121eab784ed3091f8f38c10cb0a

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
      </AuthInitializer>
    </>
  );
}
