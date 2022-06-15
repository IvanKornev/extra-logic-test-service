import { useState, useImperativeHandle } from 'react';

export const useVisibilityManager = (elemRef, callback) => {
  const [isVisible, setVisibility] = useState(false);
  useImperativeHandle(elemRef, () => ({
    show: () => setVisibility(true),
    close: () => {
      setVisibility(false);
      if (typeof callback === 'function') {
        callback();
      }
    },
  }));
  return { isVisible, setVisibility };
};
