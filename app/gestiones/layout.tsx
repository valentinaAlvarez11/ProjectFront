import type { Metadata } from "next";
import HeaderComponent from "@/components/organisms/HeaderComponent";
import { AuthInitializer } from "@/components/organisms/AuthInitializer";

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
    <AuthInitializer>
      <HeaderComponent />
      <main>
        {children}
      </main>
    </AuthInitializer>
  );
}

