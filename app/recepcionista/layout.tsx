import type { Metadata } from "next";
import AppLayout from "@/components/organisms/AppLayout";

export const metadata: Metadata = {
  title: "Panel Recepcionista - Hotel Regatta",
  description: "Panel de recepción del Hotel Regatta",
};

export default function RecepcionistaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppLayout showFooter={false} className="pb-20 sm:pb-24 md:pb-28">
      {children}
    </AppLayout>
  );
}

