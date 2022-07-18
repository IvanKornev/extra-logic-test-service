import React, { useId, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { newForm } from '@entities';
import { useMenu } from '@hooks';

import styles from './menu.module.scss';
import { Box, Tooltip } from '@mui/material';

export const FormMenu = observer(
  forwardRef((props, creatorRef) => {
    const { onlyAddOption } = props;
    const { menuRef } = useMenu(styles);
    const menuList = newForm.prepareMenuList(creatorRef);
    return (
      <Box ref={menuRef} className={styles['menu']}>
        {menuList.map((item) => {
          const { action, tooltip } = item;
          const id = useId();
          const isDisable = onlyAddOption && action.name !== 'add';
          const classSuffix = isDisable ? 'disabled' : 'enabled';
          const itemClass = styles[`menu__item_${classSuffix}`];
          return (
            <Tooltip key={id} title={tooltip} placement='right' arrow>
              <div className={itemClass}>
                <NewFormMenuIcon params={item} />
              </div>
            </Tooltip>
          );
        })}
      </Box>
    );
  }),
);

const NewFormMenuIcon = (props) => {
  const { params } = props;
  const iconClass = styles['menu__icon'];
  const IconComponent = params.iconName;
  return (
    <IconComponent
      size={30}
      id={`menu__icon_${params.action.name}`}
      color='#545454'
      onClick={params.action.callback}
      className={iconClass}
    />
  );
};

FormMenu.defaultProps = {
  onlyAddOptions: true,
};

FormMenu.propTypes = {
  onlyAddOptions: PropTypes.bool,
};
