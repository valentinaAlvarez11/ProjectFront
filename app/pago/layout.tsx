import type { Metadata } from "next";
import AppLayout from "@/components/organisms/AppLayout";

export const metadata: Metadata = {
  title: "Pago - Hotel Regatta",
  description: "Completa el pago de tu reserva",
};

export default function PagoLayout({
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

