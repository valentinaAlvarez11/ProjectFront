import type { Metadata } from "next";
import AppLayout from "@/components/organisms/AppLayout";

export const metadata: Metadata = {
  title: "Mis Gestiones - Hotel Regatta",
  description: "Gestiona tus reservas y servicios",
};

export default function GestionesLayout({
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

