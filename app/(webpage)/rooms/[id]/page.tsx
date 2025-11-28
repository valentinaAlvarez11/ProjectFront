// app/(webpage)/rooms/[id]/page.tsx
"use client";
import React from "react";
import { useParams } from "next/navigation";
import RoomsPageContent from '@/components/organisms/RoomsPageContent';

export default function RoomPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) 
           ? parseInt(params.id[0]) 
           : params?.id ? parseInt(params.id) : null;

  return <RoomsPageContent roomId={id} />;
}


