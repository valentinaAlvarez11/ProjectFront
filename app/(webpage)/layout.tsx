//webpage layout
import type { Metadata } from "next";
import AppLayout from "@/components/organisms/AppLayout";

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
    <AppLayout showFooter={true}>
      {children}
    </AppLayout>
  );
}
