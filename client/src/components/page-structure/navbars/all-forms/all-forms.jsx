import React from 'react';
import { useUserPanel } from '@hooks';

import styles from './all-forms.module.scss';
import { Avatar } from '@components/reusable';
import { UserPanel } from '@components/features/user';
import { AllFormsSearchField } from '@components/features/all-forms';
import { UilLottiefilesAlt } from '@iconscout/react-unicons';

export const AllFormsNavbar = () => {
  const userPanel = useUserPanel();
  return (
    <nav className={styles['navbar']}>
      <div className={styles['navbar__wrapper']}>
        <UilLottiefilesAlt color='rgb(76, 43, 135)' size={52} />
        <AllFormsSearchField />
        <div className={styles['navbar__avatar']}>
          <Avatar onClick={userPanel.set} withHoverEffect />
          <UserPanel panelHookInstance={userPanel} />
        </div>
      </div>
    </nav>
  );
};
