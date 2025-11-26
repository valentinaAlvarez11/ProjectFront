import type { Metadata } from "next";
import HeaderComponent from "@/components/organisms/HeaderComponent";

export const metadata: Metadata = {
  title: "Admin Dashboard - Hotel Regatta",
  description: "Panel de administración del Hotel Regatta",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="pb-20 sm:pb-24 md:pb-28">
      <HeaderComponent />
      {children}
    </main>
  );
}

