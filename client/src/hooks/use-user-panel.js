import React, { useState } from 'react';

export const useUserPanel = () => {
  const [panelAnchor, setPanelAnchor] = useState(null);
  
  const setValue = (event) => {
    setPanelAnchor(event.currentTarget);
  };
  const dropValue = () => {
    setPanelAnchor(false);
  };

  const userPanel = {
    elem: panelAnchor,
    set: (event) => setValue(event),
    drop: () => dropValue(),
  };
  return userPanel;
};
