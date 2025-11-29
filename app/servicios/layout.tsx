// app/services/layout.tsx
import AppLayout from '@/components/organisms/AppLayout';

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout showFooter={true} className="pb-28">
      {children}
    </AppLayout>
  );
}

