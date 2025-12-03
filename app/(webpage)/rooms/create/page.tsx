"use client";

import React from 'react';
import { useCreateRoom } from '@/hooks/useCreateRoom';
import CreateRoomContent from '@/components/molecules/CreateRoomContent';

const CreateRoomPage = () => {
  const {
    loadingAuth,
    isLoggedIn,
    user,
    errorModal,
    errorMessage,
  } = useCreateRoom();

  return (
    <CreateRoomContent
      loadingAuth={loadingAuth}
      isLoggedIn={isLoggedIn}
      user={user}
      errorModal={errorModal}
      errorMessage={errorMessage}
    />
  );
};

export default CreateRoomPage;

