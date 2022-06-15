import React, { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { throttle } from 'lodash';
import generateId from 'uniqid';

import { form } from '@global-states';
import { snackbarMessages, throttlingButtons, buttons } from '@constants';
import { useSnackbar } from '@hooks';

import { EventSnackbar } from '@components/reusable';
import { Button, Typography, Tabs, Tab, Grid } from '@mui/material';
import { UilFileAlt } from '@iconscout/react-unicons';
import styles from './navbar.module.scss';

export const Navbar = observer(() => (
  <nav className={styles['navbar']}>
    <Grid columns={{ xs: 3 }} direction='row' alignItems='center' container>
      <Grid gap={2} alignItems='center' direction='row' container item xs>
        <UilFileAlt color='rgb(76, 43, 135)' size={52} />
        <Typography variant='h6' component='h1'>
          Новая форма
        </Typography>
      </Grid>
      <Grid item container justifyContent='center' xs>
        <Tabs
          textColor='secondary'
          indicatorColor='secondary'
          value='create-form'>
          <Tab value='create-form' label='Создать форму' />
        </Tabs>
      </Grid>
      <Grid container item gap={2} justifyContent='flex-end' xs>
        <NavbarButtons />
      </Grid>
    </Grid>
  </nav>
));

const NavbarButtons = observer(() => {
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
      {buttons.navbar.map((button) => {
        const isDisable = wasThrottled || !form.fieldsCounter;
        const clickHandler = handleButton(button.action);
        return (
          <Button
            key={generateId()}
            id={`navbar__button_${button.action}`}
            color={button.color}
            variant='outlined'
            type='button'
            disabled={isDisable}
            onClick={throttle(clickHandler, 1500)}>
            {button.text}
          </Button>
        );
      })}
       <EventSnackbar message={message} ref={snackbarRef} />
    </>
  );
});
