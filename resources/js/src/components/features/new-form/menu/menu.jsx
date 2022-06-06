import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { Box, Tooltip } from '@mui/material';

import { newForm } from '@domains';
import { styles } from './menu.styles';

const NewFormMenu = (props) => {
  const { actions, onlyAddOption } = props;
  const menu = newForm.createMenu(actions);
  return (
    <section style={styles.menu}>
      <Box sx={styles.wrapper}>
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
    </section>
  );
};

NewFormMenu.defaultTypes = {
  onlyAddOptions: false,
};

NewFormMenu.propTypes = {
  onlyAddOptions: PropTypes.bool,
  actions: PropTypes.shape({
    add: PropTypes.func.isRequired,
    copy: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }),
};

export { NewFormMenu };
