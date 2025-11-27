import type { Metadata } from "next";
import HeaderComponent from "@/components/organisms/HeaderComponent";
import { AuthInitializer } from "@/components/organisms/AuthInitializer";

export const metadata: Metadata = {
  title: "Mis Reservas - Hotel Regatta",
  description: "Consulta tus reservas",
};

export default function MisReservasLayout({
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

