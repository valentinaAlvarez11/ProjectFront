import type { Metadata } from "next";
import AppLayout from "@/components/organisms/AppLayout";

export const metadata: Metadata = {
  title: "Reservas - Hotel Regatta",
  description: "Crea una nueva reserva en el Hotel Regatta",
};

export default function ReservasLayout({
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

