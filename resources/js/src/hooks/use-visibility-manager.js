import { useEffect, useState, useImperativeHandle } from 'react';
import { hooksOptions } from '@constants';

const { defaultAutohide } = hooksOptions.visibilityManager;
const useVisibilityManager = (
  elemRef,
  onCloseCallback = null,
  autohide = defaultAutohide,
) => {
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
      if (typeof onCloseCallback === 'function') {
        onCloseCallback();
      }
    },
  }));
  return { isVisible, setVisibility };
};

export { useVisibilityManager };
