import React from 'react';
import { useUserPanel } from '@hooks';

import styles from './all-forms.module.scss';
import { Avatar } from '@components/reusable';
import { UserPanel } from '@components/features/user';
import { TextField, InputAdornment } from '@mui/material';
import { UilLottiefilesAlt, UilSearch } from '@iconscout/react-unicons';

export const AllFormsNavbar = () => {
  const userPanel = useUserPanel();
  return (
    <nav className={styles['navbar']}>
      <div className={styles['navbar__wrapper']}>
        <UilLottiefilesAlt color='rgb(76, 43, 135)' size={52} />
        <TextField
          placeholder='Найти форму'
          color='secondary'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <UilSearch size={24} />
              </InputAdornment>
            ),
          }}
        />
        <div className={styles['navbar__avatar']}>
          <Avatar onClick={userPanel.set} withHoverEffect />
          <UserPanel panelHookInstance={userPanel} />
        </div>
      </div>
    </nav>
  );
};
