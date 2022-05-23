import React from 'react';
import { Button, Typography, Tabs, Tab, Grid } from '@mui/material';
import { UilFileAlt } from '@iconscout/react-unicons';

import { styles } from './navbar.styles';

export const Navbar = () => (
  <nav style={ styles.navbar }>
    <Grid columns={{ xs: 3 }} direction="row" alignItems="center" container>
      <Grid gap={ 2 } alignItems="center" direction="row" container item xs>
        <UilFileAlt color="rgb(76, 43, 135)" size={ 52 } />
        <Typography variant="h6" component="h1">
          Новая форма
        </Typography>
      </Grid>
      <Grid item container justifyContent="center" xs>
        <Tabs textColor="secondary" indicatorColor="secondary" value="create-form">
          <Tab value="create-form" label="Создать форму" />
          <Tab value="all-forms" label="Все формы" />
        </Tabs>
      </Grid>
      <Grid container item gap={ 2 } justifyContent="flex-end" xs>
        <Button color="secondary" variant="outlined">
          Сохранить
        </Button>
        <Button color="error" variant="outlined">
          Удалить
        </Button>
      </Grid>
    </Grid>
  </nav>
);
