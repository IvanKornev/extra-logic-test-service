import React from 'react';
import { useNavigate } from 'react-router-dom';

import { usePageNavigator } from '@hooks';

import { Typography } from '@mui/material';
import { UilHistoryAlt } from '@iconscout/react-unicons';
import styles from './back-button.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();
  const clickHandler = () => {
    usePageNavigator(navigate, 'all-forms')([]);
  };
  return (
    <div
      onClick={clickHandler}
      className={styles['button']}>
      <UilHistoryAlt color='rgb(76, 43, 135)' size={30} />
      <Typography variant='h6' component='h2'>
        Вернуться обратно
      </Typography>
    </div>
  );
}
