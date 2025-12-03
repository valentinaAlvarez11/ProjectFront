import type { Metadata } from "next";
import AppLayout from "@/components/organisms/AppLayout";

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
    <AppLayout showFooter={false} className="pb-20 sm:pb-24 md:pb-28">
      {children}
    </AppLayout>
  );
}

