import React, { useId, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react-lite';
import { form } from '@global-states';

import { newForm } from '@domains';
import { useMenu, useMessenger } from '@hooks';

import styles from './menu.module.scss';
import { Box, Tooltip } from '@mui/material';
import { EventMessage } from '@components/reusable';

const NewFormMenu = observer(
  forwardRef((props, creatorRef) => {
    const { onlyAddOption } = props;
    const { pixelShift, classes } = useMenu(styles);
    const cachedField = useRef(null);
    const messenger = useMessenger();
    const menu = newForm.createMenu(creatorRef);
    return (
      <>
        <Box sx={{ marginTop: pixelShift }} className={classes.join(' ')}>
          {menu.map((item) => {
            const { iconName, action, tooltip } = item;
            const id = useId();
            const IconComponent = iconName;
            const isDisable = onlyAddOption && action.name !== 'add';
            const clickHandler = () => {
              action.callback();
              if (action.name === 'remove') {
                cachedField.current = { ...form.selectedField };
                messenger.showMessage('Поле формы удалено');
              }
            };
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
                    onClick={clickHandler}
                    className={`${itemClass} ${iconClass}`}
                  />
                </>
              </Tooltip>
            );
          })}
        </Box>
        <FieldRestoreMessage
          cachedField={cachedField}
          messenger={messenger}
        />
      </>
    );
  }),
);

const FieldRestoreMessage = (props) => {
  const { messenger, cachedField } = props;
  const clickHandler = () => {
    form.createField(cachedField.current);
  };
  return (
    <EventMessage
      action={
        <span
          onClick={clickHandler}
          className={styles['alert__action']}>
          Вернуть
        </span>
      }
      ref={messenger.messengerRef}
      message={messenger.message}
      withSnackbar
    />
  );
};

NewFormMenu.defaultTypes = {
  onlyAddOptions: false,
};

NewFormMenu.propTypes = {
  onlyAddOptions: PropTypes.bool,
};

export { NewFormMenu };
