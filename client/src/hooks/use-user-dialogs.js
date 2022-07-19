import { useRef } from 'react';

export const useUserDialogs = () => {
  const dialogsRef = {
    authorization: useRef(),
    registration: useRef(),
  };
  const dialogsTypes = ['authorization', 'registration'];

  return {
    dialogsTypes,
    dialogsRef,
  };
};
