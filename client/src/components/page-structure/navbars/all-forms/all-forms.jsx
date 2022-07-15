import React from 'react';

import styles from './all-forms.module.scss';
import { UilFileAlt } from '@iconscout/react-unicons';
import { UserAvatar } from '@components/features/user';

export const AllFormsNavbar = () => (
  <nav className={styles['navbar']}>
    <div className={styles['navbar__wrapper']}>
      <UilFileAlt color='rgb(76, 43, 135)' size={52} />
      <UilFileAlt color='rgb(76, 43, 135)' size={52} />
      <div><UserAvatar nickname='Kyle Shitman' /></div>
    </div>
  </nav>
);
