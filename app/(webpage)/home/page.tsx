import CarrouselHomepage from "@/components/organisms/CarrouselHomepage";
import RoomCards from "@/components/organisms/ShowRoomCards";
import ComodidadesSection from "@/components/organisms/ComodidadesSection";
import React from 'react';

export default function HomePageClient() {
  return (
    <div style={{ overflow: 'hidden' }}>
      <CarrouselHomepage />
      <ComodidadesSection />
      <RoomCards />
    </div>
  );
}
