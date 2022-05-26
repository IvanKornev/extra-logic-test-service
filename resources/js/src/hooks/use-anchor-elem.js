import React, { useState, useRef, useEffect } from 'react';

export const useAnchorElem = () => {
  let [anchorElem, setAnchorElem] = useState(null);
  let startElem = useRef(null);

  useEffect(() => {
    setAnchorElem(startElem.current);
  }, []);

  return { anchorElem, setAnchorElem, startElem };
};
