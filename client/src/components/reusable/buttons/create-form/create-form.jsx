import React from 'react';
import { useNavigate } from 'react-router-dom';

import { UilPlus } from '@iconscout/react-unicons';
import { Tooltip, Typography } from '@mui/material';
import styles from './create-form.module.scss';

export const CreateFormButton = () => {
  const navigate = useNavigate();
  const clickHandler = () => navigate('/form/new');
  return (
    <>
      <Tooltip
        title={<TooltipTitle />}
        placement='top'
        arrow>
        <section
          onClick={clickHandler}
          className={styles['create-form-button']}>
          <div className={styles['create-form-button__wrapper']}>
            <UilPlus size={30} color='#fff' />
          </div>
        </section>
      </Tooltip>
    </>
  );
};

const TooltipTitle = () => (
  <Typography sx={{ fontSize: '0.9rem' }}>
    Создать новую форму
  </Typography>
);
