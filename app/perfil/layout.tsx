import type { Metadata } from "next";
import HeaderComponent from "@/components/organisms/HeaderComponent";
import { AuthInitializer } from "@/components/organisms/AuthInitializer";

export const metadata: Metadata = {
  title: "Mi Perfil - Hotel Regatta",
  description: "Gestiona tu perfil de usuario",
};

export default function PerfilLayout({
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

