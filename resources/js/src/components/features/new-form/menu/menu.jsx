import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { Box, Tooltip } from '@mui/material';
import { newForm } from '@domains';
import styles from './menu.module.scss';

const NewFormMenu = observer((props) => {
  const { showEditorAction, onlyAddOption } = props;
  const menu = newForm.createMenu(showEditorAction);
  return (
    <section>
      <Box className={styles['menu__wrapper']}>
        {menu.map((item) => {
          const { iconName, action, tooltip } = item;
          const id = useId();
          const IconComponent = iconName;

          const isDisable = onlyAddOption && action.name !== 'add';
          const classSuffix = isDisable ? '_disabled' : '_enabled';
          return (
            <Tooltip key={id} title={tooltip} placement='right'>
              <div>
                <IconComponent
                  id={`menu__icon_${action.name}`}
                  color='#545454'
                  onClick={action.callback}
                  className={styles[`menu__item${classSuffix}`]}
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
