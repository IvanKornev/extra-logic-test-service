import React, { useState, useId } from 'react';
import { observer } from 'mobx-react-lite';
import { throttle } from 'lodash';

import { form } from '@global-states';
import { snackbarMessages, buttons } from '@constants';
import { useSnackbar, useDrawer } from '@hooks';

import { EventSnackbar } from '@components/reusable';
import { Button, Typography, Tabs, Tab, Drawer } from '@mui/material';
import { UilFileAlt, UilBars, UilPlusSquare } from '@iconscout/react-unicons';
import styles from './navbar.module.scss';

export const Navbar = observer(() => {
  const { isMobileDevice, drawerWasOpened, openDrawer } = useDrawer();
  return (
    <nav className={styles['navbar']}>
      <div className={styles['navbar__wrapper']}>
        <div className={styles['navbar__logo']}>
          <UilFileAlt color='rgb(76, 43, 135)' size={52} />
          <Typography variant='h6' component='h1'>
            Новая форма
          </Typography>
        </div>
        {!isMobileDevice && (
          <NavbarInteractivePart />
        )}
        {isMobileDevice && (
          <UilBars
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
  const { message, showSnackbar, snackbarRef } = useSnackbar();
  const handleButton = (actionName) => () => {
    form[actionName]();
    setThrottlingStatus(true);
    showSnackbar(snackbarMessages.form[actionName].success);
    setTimeout(() => setThrottlingStatus(false), 1500);
  };
  return (
    <>
      <div className={styles['navbar__items']}>
        {isMobileDevice && (
          <div className={styles['navbar__item']}>
            <UilPlusSquare color='rgb(76, 43, 135)' size={30} />
            <Typography variant='h6' component='h2'>
              Создать форму
            </Typography>
          </div>  
        )}
        {!isMobileDevice && (
          <Tabs
            textColor='secondary'
            indicatorColor='secondary'
            value='to-create-form'>
            <Tab value='to-create-form' label='Создать форму' />
          </Tabs>
        )}
      </div>
      <div className={styles['navbar__buttons']}>
        {buttons.navbar.map((button) => {
          const isDisable = wasThrottled || !form.fieldsCounter;
          const clickHandler = handleButton(button.action);
          return (
            <Button
              key={useId()}
              id={`navbar__button_${button.action}`}
              color={button.color}
              variant={isMobileDevice ? 'contained' : 'outlined'}
              disabled={isDisable}
              type='button'
              onClick={throttle(clickHandler, 1500)}>
              {button.text}
            </Button>
          );
        })}
        <EventSnackbar message={message} ref={snackbarRef} />
      </div>
    </>
  );
});
