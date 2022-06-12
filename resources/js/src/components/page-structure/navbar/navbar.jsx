import React, { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { throttle } from 'lodash';

import { form } from '@global-states';
import { snackbarMessages, throttlingButtons } from '@constants';

import { EventSnackbar } from '@components/reusable';
import { Button, Typography, Tabs, Tab, Grid } from '@mui/material';
import { UilFileAlt } from '@iconscout/react-unicons';
import { styles } from './navbar.styles';

export const Navbar = observer(() => {
  const snackbarRef = useRef();
  const [message, setMessage] = useState(null);
  const [throttledButtons, setThrottledButtons] = useState(throttlingButtons.navbar);

  const handleButton = (actionName) => {
    setThrottledButtons((buttons) => ({...buttons, [actionName]: true}));
    setMessage(snackbarMessages.form[actionName].success);
    snackbarRef.current.show();
    setTimeout(() => {
      setThrottledButtons((buttons) => (
        {...buttons, [actionName]: false}
      ));
    }, 1500);
  };
  
  return (
    <>
      <nav style={styles.navbar}>
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
              <Tab value='all-forms' label='Все формы' />
            </Tabs>
          </Grid>
          <Grid container item gap={2} justifyContent='flex-end' xs>
            <Button
              color='secondary'
              variant='outlined'
              type='submit'
              disabled={(throttledButtons.save === true)}
              onClick={async () => {
                await form.save();
                throttle(handleButton('save'), 1500);
              }}>
              Сохранить
            </Button>
            <Button
              type='button'
              color='error'
              variant='outlined'
              disabled={(throttledButtons.reset === true)}
              onClick={() => {
                form.reset();
                throttle(handleButton('reset'), 1500);
              }}>
              Сбросить
            </Button>
          </Grid>
        </Grid>
      </nav>
      <EventSnackbar message={message} ref={snackbarRef} />
    </>
  );
});
