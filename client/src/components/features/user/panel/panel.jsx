import React from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react-lite';
import { userState } from '@global-states';

import { Avatar } from '@components/reusable';
import { Menu, Button, Typography } from '@mui/material';
import styles from './panel.module.scss';

export const UserPanel = observer((props) => {
  const { panelHookInstance } = props;
  const { elem, drop } = panelHookInstance;
  const isOpen = Boolean(elem);
  return (
    <Menu onClose={drop} anchorEl={elem} open={isOpen}>
      <div className={styles['user-panel__wrapper']}>
        <div className={styles['user-panel__avatar']}>
          <Avatar size='large' />
        </div>
        <div className={styles['user-panel__information']}>
          <Typography>{userState.profile.nickname}</Typography>
          <Typography>{userState.profile.email}</Typography>
        </div>
        <Button color='secondary' variant='outlined'>
          Выйти
        </Button>
      </div>
    </Menu>
  );
});

UserPanel.propTypes = {
  panelHookInstance: PropTypes.object.isRequired,
};
