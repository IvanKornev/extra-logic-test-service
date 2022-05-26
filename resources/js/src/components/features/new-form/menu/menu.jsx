import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { Popper, Box } from '@mui/material';

import { newForm } from '@domains';
import { styles } from './menu.styles';

const NewFormMenu = ({ anchorElem }) => (
  <Popper
    placement='right-start'
    anchorEl={anchorElem}
    open={anchorElem !== null}>
    <Box sx={styles.menu}>
      {newForm.menu.map((item) => {
        const { iconName, action } = item;
        const id = useId();
        const IconComponent = iconName;
        return (
          <IconComponent
            key={id}
            color='#545454'
            onClick={action}
          />
        );
      })}
    </Box>
  </Popper>
);

NewFormMenu.defaultTypes = {
  anchorElem: null,
};

NewFormMenu.propTypes = {
  anchorElem: PropTypes.object,
};

export { NewFormMenu };
