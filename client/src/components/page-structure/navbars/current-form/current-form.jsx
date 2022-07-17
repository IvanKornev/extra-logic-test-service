import React, { useState, useId } from 'react';
import { observer } from 'mobx-react-lite';
import { throttle } from 'lodash';

import { useNavigate } from 'react-router-dom';
import { usePageNavigator } from '@hooks';

import { formState } from '@global-states';
import { messages, buttons } from '@constants';
import { useMessenger, useDrawer } from '@hooks';

import styles from './current-form.module.scss';
import { EventMessage } from '@components/reusable';
import { Button, Typography, Drawer } from '@mui/material';
import {
  UilLottiefilesAlt,
  UilBars,
  UilTimes,
  UilHistoryAlt,
} from '@iconscout/react-unicons';

export const CurrentFormNavbar = observer(() => {
  const { isMobileDevice, drawerWasOpened, openDrawer } = useDrawer();
  const MobileIcon = drawerWasOpened ? UilTimes : UilBars;
  return (
    <nav className={styles['navbar']}>
      <div className={styles['navbar__wrapper']}>
        <div className={styles['navbar__logo']}>
          <UilLottiefilesAlt color='rgb(76, 43, 135)' size={52} />
          <Typography variant='h6' component='h1'>
            {formState.titleField.name}
          </Typography>
        </div>
        {!isMobileDevice && <NavbarInteractivePart />}
        {isMobileDevice && (
          <MobileIcon
            className={styles['navbar__icon_bars']}
            color='rgb(76, 43, 135)'
            onClick={() => openDrawer(true)}
            size={36}
          />
        )}
      </div>
      <Drawer
        anchor='left'
        onClose={() => openDrawer(false)}
        open={drawerWasOpened}>
        <div className={styles['drawer__wrapper']}>
          <NavbarInteractivePart isMobileDevice={isMobileDevice} />
        </div>
      </Drawer>
    </nav>
  );
});

const NavbarInteractivePart = observer(({ isMobileDevice }) => {
  const [wasThrottled, setThrottlingStatus] = useState(false);
  const { message, showMessage, messengerRef } = useMessenger();
  
  const navigate = useNavigate();
  const iconClickHandler = () => {
    usePageNavigator(navigate, 'all-forms')([]);
  };

  const handleAction = (actionName) => () => {
    formState[actionName]();
    setThrottlingStatus(true);
    showMessage(messages.form[actionName].success);
    setTimeout(() => setThrottlingStatus(false), 2000);
  };
  return (
    <>
      <div className={styles['navbar__items']}>
        {isMobileDevice && (
          <div
            onClick={iconClickHandler}
            className={styles['navbar__item_mobile']}>
            <UilHistoryAlt color='rgb(76, 43, 135)' size={30} />
            <Typography variant='h6' component='h2'>
              Вернуться обратно
            </Typography>
          </div>
        )}
        {!isMobileDevice && (
          <div className={styles['navbar__item_desktop']}>
            <Button
              onClick={iconClickHandler}
              startIcon={<UilHistoryAlt />}>
              Вернуться обратно
            </Button>
          </div>
        )}
      </div>
      <div className={styles['navbar__buttons']}>
        {buttons.navbar.map((button) => {
          const isDisable = wasThrottled || !formState.fieldsCounter;
          const buttonClickHandler = handleAction(button.action);
          const ButtonIcon = button.icon;
          return (
            <Button
              key={useId()}
              id={`navbar__button_${button.action}`}
              color={button.color}
              variant={isMobileDevice ? 'contained' : 'outlined'}
              disabled={isDisable}
              startIcon={<ButtonIcon />}
              type='button'
              onClick={throttle(buttonClickHandler, 2000)}>
              {button.text}
            </Button>
          );
        })}
        <EventMessage
          withSnackbar={isMobileDevice ? false : true}
          message={message}
          ref={messengerRef}
        />
      </div>
    </>
  );
});