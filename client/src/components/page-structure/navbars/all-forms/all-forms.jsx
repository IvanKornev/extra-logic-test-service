import React, { useRef, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserPanel } from '@hooks';

import styles from './all-forms.module.scss';
import { Avatar } from '@components/reusable';
import { AllFormsSearchField } from '@components/features/all-forms';
import { UilLottiefilesAlt } from '@iconscout/react-unicons';
import { UserPanel, UserDialog } from '@components/features/user';

export const AllFormsNavbar = () => {
  const userPanel = useUserPanel();
  const navigate = useNavigate();
  const goToAllForms = () => navigate('/');
  const dialogsRef = {
    authorization: useRef(),
    registration: useRef(),
  };
  const dialogTypes = ['authorization', 'registration'];
  return (
    <>
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
            <UserPanel dialogsRef={dialogsRef} panelHookInstance={userPanel} />
          </div>
        </div>
      </nav>
      {dialogTypes.map((type) => (
        <UserDialog actionType={type} ref={dialogsRef[type]} key={useId()} />
      ))}
    </>
  );
};
