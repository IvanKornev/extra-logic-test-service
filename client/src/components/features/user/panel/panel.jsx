import React, { useId } from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react-lite';
import { userState } from '@global-states';
import { buttons } from '@constants';

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
        {userState.isAuthorized && (
          <AuthorizedUserPanel />
        )}
        {!userState.isAuthorized && (
          <UnauthorizedUserPanel />
        )}
      </div>
    </Menu>
  );
});

const UnauthorizedUserPanel = () => (
  <>
    <Typography textAlign='center'>
      Вы не авторизованы
    </Typography>
    <div className={styles['user-panel__buttons_unauthorized']}>
      {buttons.userPanel.unauthorized.map((button) => {
        const { text, icon } = button;
        const IconComponent = icon;
        return (
          <Button
            variant='outlined'
            key={useId()}
            startIcon={<IconComponent />}>
            {text}
          </Button>
        );
      })}
    </div>
  </>
)

const AuthorizedUserPanel = () => (
  <>
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
  </>
)

UserPanel.propTypes = {
  panelHookInstance: PropTypes.object.isRequired,
};
