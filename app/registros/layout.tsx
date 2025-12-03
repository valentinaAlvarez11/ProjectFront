import type { Metadata } from "next";
import AppLayout from "@/components/organisms/AppLayout";

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
    <AppLayout showFooter={false}>
      {children}
    </AppLayout>
  );
}
