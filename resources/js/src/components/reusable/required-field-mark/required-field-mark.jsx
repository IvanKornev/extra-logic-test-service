import React from 'react';
import { Tooltip } from '@mui/material';
import styles from './required-field-mark.module.scss';

export const RequiredFieldMark = () => (
  <Tooltip title='Поле является обязательным' placement='right' arrow>
    <span className={styles['mark']}>*</span>
  </Tooltip>
);
