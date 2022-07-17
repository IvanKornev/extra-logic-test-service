import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserPanel } from '@hooks';

import styles from './all-forms.module.scss';
import { Avatar } from '@components/reusable';
import { UserPanel } from '@components/features/user';
import { AllFormsSearchField } from '@components/features/all-forms';
import { UilLottiefilesAlt } from '@iconscout/react-unicons';

export const AllFormsNavbar = () => {
  const userPanel = useUserPanel();
  const navigate = useNavigate();
  const goToAllForms = () => navigate('/');
  return (
    <nav className={styles['navbar']}>
      <div className={styles['navbar__wrapper']}>
        <div className={styles['navbar__logo']}>
          <UilLottiefilesAlt
            onClick={goToAllForms}
            color='rgb(76, 43, 135)'
            size={52}
          />
        </div>
        <AllFormsSearchField />
        <div className={styles['navbar__avatar']}>
          <Avatar onClick={userPanel.set} withHoverEffect />
          <UserPanel panelHookInstance={userPanel} />
        </div>
      </div>
    </nav>
  );
};
