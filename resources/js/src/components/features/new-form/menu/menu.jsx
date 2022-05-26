import React from 'react';
import { Popper, Box } from '@mui/material';

import { newForm } from '@domains';
import { styles } from './menu.styles';

const NewFormMenu = ({ anchorEl }) => (
  <Popper placement="right-start" anchorEl={ anchorEl } open={ anchorEl !== null }>
    <Box sx={ styles.menu }>
      { newForm.menu.map((item) => {
        const { iconName, action } = item;
        const IconComponent = iconName;
        return <IconComponent color="#545454" onClick={ action } />
      })}
    </Box>
  </Popper>
);

export { NewFormMenu };
