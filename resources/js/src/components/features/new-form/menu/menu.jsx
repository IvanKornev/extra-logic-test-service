import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { Box, Tooltip } from '@mui/material';
import { newForm } from '@domains';
import { styles } from './menu.styles';

const NewFormMenu = observer((props) => {
  const { showEditorAction, onlyAddOption } = props;
  const menu = newForm.createMenu(showEditorAction);
  return (
    <section>
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
                  onClick={action.callback}
                  style={isDisable ? styles.disabledOption : styles.option}
                />
              </div>
            </Tooltip>
          );
        })}
      </Box>
    </section>
  );
});

NewFormMenu.defaultTypes = {
  onlyAddOptions: false,
};

NewFormMenu.propTypes = {
  onlyAddOptions: PropTypes.bool,
  showEditorAction: PropTypes.func.isRequired,
};

export { NewFormMenu };
