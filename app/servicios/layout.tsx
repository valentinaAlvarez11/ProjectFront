// app/services/layout.tsx
import Header from '../../components/organisms/HeaderComponent';
import Footer from '../../components/organisms/FooterBooking';

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <main className='pb-28'>{children}</main>
      <Footer />
    </>
  );
}

