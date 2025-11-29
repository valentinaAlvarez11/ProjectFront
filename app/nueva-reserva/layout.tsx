import type { Metadata } from "next";
import AppLayout from "@/components/organisms/AppLayout";

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
    <AppLayout showFooter={false}>
      {children}
    </AppLayout>
  );
}

