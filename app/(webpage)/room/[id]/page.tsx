// app/(webpage)/room/[id]/page.tsx
"use client";
import React from "react";
import { useParams } from "next/navigation";
import RoomPageContent from '@/components/organisms/RoomPageContent';

export default function RoomPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) 
           ? parseInt(params.id[0]) 
           : params?.id ? parseInt(params.id) : null;

  return <RoomPageContent roomId={id} />;
}