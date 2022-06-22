import React from 'react';
import { Tooltip } from '@mui/material';
import styles from './required-field-mark.module.scss';

export const RequiredFieldMark = () => {
  const spanClass = `${styles['mark']} required-field-mark__span`;
  return (
    <Tooltip
      id='required-field-mark__tooltip'
      title='Поле является обязательным'
      placement='right'
      arrow>
      <span className={spanClass}>*</span>
    </Tooltip>
  );
};
