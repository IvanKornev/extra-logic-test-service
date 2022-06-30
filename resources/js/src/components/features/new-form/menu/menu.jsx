import React, { useId, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react-lite';
import { form } from '@global-states';

import { newForm, getField } from '@domains';
import { useMenu, useMessenger } from '@hooks';

import styles from './menu.module.scss';
import { Box, Tooltip } from '@mui/material';
import { EventMessage } from '@components/reusable';

const NewFormMenu = observer(
  forwardRef((props, creatorRef) => {
    const { onlyAddOption } = props;
    const { menuRef } = useMenu(styles);
    const cachedField = useRef(null);
    const messenger = useMessenger();
    const menu = newForm.createMenu(creatorRef);
    return (
      <>
        <Box ref={menuRef} className={styles['menu']}>
          {menu.map((item) => {
            const { iconName, action, tooltip } = item;
            const id = useId();
            const IconComponent = iconName;
            const isDisable = onlyAddOption && action.name !== 'add';

            const clickHandler = () => {
              if (action.name === 'remove') {
                const { selectedField, fieldsList } = form;
                cachedField.current = getField(selectedField, fieldsList);
                messenger.showMessage('Поле формы удалено');
              }
              action.callback();
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
        <FieldRestoreMessage cachedField={cachedField} messenger={messenger} />
      </>
    );
  }),
);

const FieldRestoreMessage = (props) => {
  const { messenger, cachedField } = props;
  const clickHandler = () => {
    if (cachedField.current) {
      const { values, position } = cachedField.current;
      form.createField(values);
      cachedField.current = null;
    }
  };
  const messageAction = {
    title: 'Вернуть',
    callback: clickHandler,
  };
  return (
    <EventMessage
      action={messageAction}
      ref={messenger.messengerRef}
      message={messenger.message}
      withSnackbar
    />
  );
};

NewFormMenu.defaultProps = {
  onlyAddOptions: true,
};

NewFormMenu.propTypes = {
  onlyAddOptions: PropTypes.bool,
};

export { NewFormMenu };
