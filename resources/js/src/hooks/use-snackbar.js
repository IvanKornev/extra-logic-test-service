import { useState, useRef } from 'react';

export const useSnackbar = () => {
  const snackbarRef = useRef();
  const [message, setMessage] = useState('Уведомление');

  const showSnackbar = (messageText = 'Уведомление') => {
    setMessage(messageText);
    snackbarRef.current.show();
  };

  return { snackbarRef, message, showSnackbar };
};
