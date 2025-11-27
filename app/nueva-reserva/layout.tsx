import type { Metadata } from "next";
import HeaderComponent from "@/components/organisms/HeaderComponent";
import { AuthInitializer } from "@/components/organisms/AuthInitializer";

export const metadata: Metadata = {
  title: "Nueva Reserva - Hotel Regatta",
  description: "Crea una nueva reserva",
};

export default function NuevaReservaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthInitializer>
      <HeaderComponent />
      <main>
        {children}
      </main>
    </AuthInitializer>
  );
}

