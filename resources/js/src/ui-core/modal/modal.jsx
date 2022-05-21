import React from 'react';
import { Modal as MainElem, Box } from '@mui/material';

import { styles } from './modal.styles';

export const Modal = props => (
  <MainElem { ...props } sx={ styles.modal }>
    <Box component="section" sx={ styles.box }>
      { props.children }
    </Box>
  </MainElem>
);
