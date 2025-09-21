// app/services/layout.tsx
import Header from '../../components/organisms/HeaderComponent';
import Footer from '../../components/organisms/FooterBooking';

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
