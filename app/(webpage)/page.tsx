import type { Metadata } from 'next'; 
import HomePageClient from '../(webpage)/home/page';

// Definimos y exportamos el objeto 'metadata' desde el Server Component
export const metadata: Metadata = {
  title: 'Regatta Hotel | Home',
  description: 'Hotel Regatta Cartagena ubicado frente a las playas de Bocagrande, a solo 5 minutos del centro histórico. Reserva tu habitación con vista al mar.',
  keywords: ['Hotel Regatta', 'hotel cartagena', 'bocagrande', 'hotel frente al mar', 'reserva hotel cartagena', 'hotel en cartagena'],
};

// Este componente ahora es un Server Component
export default function Page() {
  return (
    <HomePageClient />
  );
}