import { useState, useImperativeHandle } from 'react';

export const useVisibilityManager = (elemRef, initialValue = false) => {
  const [isVisible, setVisibility] = useState(initialValue);
  useImperativeHandle(elemRef, () => ({
    show: () => setVisibility(true),
    close: () => setVisibility(false),
  }));
  return { isVisible, setVisibility };
};
