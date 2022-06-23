import { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useDrawer = (initialState = false) => {
  const isMobileDevice = useMediaQuery('(max-width:768px)');
  const [drawerWasOpened, openDrawer] = useState(initialState);
  
  useEffect(() => {
    if (!isMobileDevice) {
      openDrawer(false);
    }
  }, [isMobileDevice]);

  return { isMobileDevice, drawerWasOpened, openDrawer };
};
