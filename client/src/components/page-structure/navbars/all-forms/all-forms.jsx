import React from 'react';
import { useUserPanel } from '@hooks';

import styles from './all-forms.module.scss';
import { UserAvatar, UserPanel } from '@components/features/user';
import { UilFileAlt } from '@iconscout/react-unicons';

export const AllFormsNavbar = () => {
  const userPanel = useUserPanel();
  return (
    <nav className={styles['navbar']}>
      <div className={styles['navbar__wrapper']}>
        <UilFileAlt color='rgb(76, 43, 135)' size={52} />
        <UilFileAlt color='rgb(76, 43, 135)' size={52} />
        <div>
          <UserAvatar onClick={userPanel.set} />
          <UserPanel panelHookInstance={userPanel} />
        </div>
      </div>
    </nav>
  );
};
