import React, { useId, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { newForm } from '@domains';
import { useMenu } from '@hooks';

import styles from './menu.module.scss';
import { Box, Tooltip } from '@mui/material';

const NewFormMenu = observer(
  forwardRef((props, creatorRef) => {
    const { onlyAddOption } = props;
    const { menuRef } = useMenu(styles);
    const menuList = newForm.prepareMenuList(creatorRef);
    return (
      <Box ref={menuRef} className={styles['menu']}>
        {menuList.map((item) => {
          const { iconName, action, tooltip } = item;
          const id = useId();
          const IconComponent = iconName;
          const isDisable = onlyAddOption && action.name !== 'add';
          const classSuffix = isDisable ? 'disabled' : 'enabled';
          const itemClass = styles[`menu__item_${classSuffix}`];
          const iconClass = styles['menu__icon'];
          return (
            <Tooltip key={id} title={tooltip} placement='right'>
              <>
                <IconComponent
                  size={30}
                  id={`menu__icon_${action.name}`}
                  color='#545454'
                  onClick={action.callback}
                  className={`${itemClass} ${iconClass}`}
                />
              </>
            </Tooltip>
          );
        })}
      </Box>
    );
  }),
);

NewFormMenu.defaultProps = {
  onlyAddOptions: true,
};

NewFormMenu.propTypes = {
  onlyAddOptions: PropTypes.bool,
};

export { NewFormMenu };
