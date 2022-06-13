import { useState, useRef } from 'react';

export const useSnackbar = () => {
  const snackbarRef = useRef();
  const [message, setMessage] = useState(null);

  const showSnackbar = (messageText = 'Уведомление') => {
    setMessage(messageText);
    snackbarRef.current.show();
  };

  return { snackbarRef, message, showSnackbar };
};
