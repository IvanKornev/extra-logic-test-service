import { useState, useRef } from 'react';

export const useMessenger = () => {
  const messengerRef = useRef();
  const [message, setMessage] = useState('Уведомление');

  const showMessage = (messageText = 'Уведомление') => {
    setMessage(messageText);
    messengerRef.current.show();
  };

  return { messengerRef, message, showMessage };
};
