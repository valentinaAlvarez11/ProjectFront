import type { Metadata } from 'next'; 
import HomePageClient from '../(webpage)/home/page';

// Definimos y exportamos el objeto 'metadata' desde el Server Component
export const metadata: Metadata = {
  title: 'Mercado Libre Colombia - Envíos Gratis en el día',
  description: 'Descubre las mejores ofertas en productos electrónicos, ropa, hogar y más. ¡Encuentra lo que buscas en Mercado Libre!',
  keywords: ['Mercado Libre', 'ecommerce', 'compras online', 'ofertas', 'envíos gratis'],
};

// Este componente ahora es un Server Component
export default function Page() {
  return (
    <HomePageClient />
  );
}