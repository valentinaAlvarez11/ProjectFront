import HeaderComponent from "@/components/organisms/HeaderComponent";
import FooterBooking from "@/components/organisms/FooterBooking";

export default function WebpageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <HeaderComponent />
      { children }
      <FooterBooking />
    </main>
  );
}
