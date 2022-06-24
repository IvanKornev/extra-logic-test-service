import { useEffect, useState, useImperativeHandle } from 'react';

const defaultOptions = {
  isEnable: false,
  duration: 0,
};

const useVisibilityManager = (elemRef, autohide = defaultOptions, callback = null) => {
  const [isVisible, setVisibility] = useState(false);

  useEffect(() => {
    if (isVisible && autohide.isEnable) {
      setTimeout(() => {
        setVisibility(false);
      }, autohide.duration);
    }
  }, [isVisible]);

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

export { useVisibilityManager };
