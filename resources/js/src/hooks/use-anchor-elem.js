import { useState, useRef, useEffect } from 'react';

export const useAnchorElem = () => {
  const [anchorElem, setAnchorElem] = useState(null);
  const titleFieldRef = useRef(null);

  useEffect(() => {
    setAnchorElem(titleFieldRef.current);
  }, []);

  return { anchorElem, setAnchorElem, titleFieldRef };
};
