import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { Popper, Box, Tooltip } from '@mui/material';

import { newForm } from '@domains';
import { styles } from './menu.styles';

const NewFormMenu = (props) => {
  const { anchorElem, actionsCallbacks } = props;
  const menu = newForm.createMenu(actionsCallbacks);
  return (
    <Popper
      placement='right-start'
      anchorEl={anchorElem}
      open={anchorElem !== null}>
      <Box sx={styles.menu}>
        {menu.map((item) => {
          const { iconName, action, tooltip } = item;
          const id = useId();
          const IconComponent = iconName;
          return (
            <Tooltip key={id} title={tooltip} placement='right'>
              <div>
                <IconComponent color='#545454' onClick={action} />
              </div>
            </Tooltip>
          );
        })}
      </Box>
    </Popper>
  );
};

NewFormMenu.defaultTypes = {
  anchorElem: null,
};

NewFormMenu.propTypes = {
  anchorElem: PropTypes.object,
  actionsCallbacks: PropTypes.shape({
    add: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    copy: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }),
};

export { NewFormMenu };
