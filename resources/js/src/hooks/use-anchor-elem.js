import React, { useState, useRef, useEffect } from 'react';

export const useAnchorElem = () => {
  const [anchorElem, setAnchorElem] = useState(null);
  const startElem = useRef(null);

  useEffect(() => {
    setAnchorElem(startElem.current);
  }, []);

  return { anchorElem, setAnchorElem, startElem };
};
