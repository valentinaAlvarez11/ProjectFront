"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { useEditRoom } from '@/hooks/useEditRoom';
import EditRoomContent from '@/components/molecules/EditRoomContent';

const EditRoomPage = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) 
           ? parseInt(params.id[0]) 
           : params?.id ? parseInt(params.id) : null;
  
  const {
    room,
    loading,
    error,
    loadingAuth,
    isLoggedIn,
    user,
    errorModal,
    errorModalMessage,
    handleSuccess,
  } = useEditRoom(id);

  return (
    <EditRoomContent
      room={room}
      loading={loading}
      error={error}
      loadingAuth={loadingAuth}
      isLoggedIn={isLoggedIn}
      user={user}
      errorModal={errorModal}
      errorModalMessage={errorModalMessage}
      onSuccess={handleSuccess}
    />
  );
};

export default EditRoomPage;

