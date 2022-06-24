import { useEffect, useState, useImperativeHandle } from 'react';
import { autohideDefaultOptions } from '@constants';

const useVisibilityManager = (
  elemRef,
  onCloseCallback = null,
  autohide = autohideDefaultOptions,
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
