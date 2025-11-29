import type { Metadata } from "next";
import HeaderComponent from "@/components/organisms/HeaderComponent";
import { AuthInitializer } from "@/components/organisms/AuthInitializer";

export const metadata: Metadata = {
  title: "Historial de Compras - Hotel Regatta",
  description: "Consulta tu historial de compras y pagos",
};

export default function RegistrosLayout({
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
