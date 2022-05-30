import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { Popper, Box, Tooltip } from '@mui/material';

import { newForm } from '@domains';
import { styles } from './menu.styles';

const NewFormMenu = (props) => {
  const { anchorElem, actions, onlyAddOption } = props;
  const menu = newForm.createMenu(actions);
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
          const isDisable = onlyAddOption && action.name !== 'add';
          return (
            <Tooltip key={id} title={tooltip} placement='right'>
              <div>
                <IconComponent
                  color='#545454'
                  onClick={action}
                  style={isDisable ? styles.disabledOption : styles.option}
                />
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
  onlyAddOptions: false,
};

NewFormMenu.propTypes = {
  onlyAddOptions: PropTypes.bool,
  anchorElem: PropTypes.object,
  actions: PropTypes.shape({
    add: PropTypes.func.isRequired,
    copy: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }),
};

export { NewFormMenu };
