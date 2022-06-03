import React from 'react';
import { Tooltip } from '@mui/material';
import { styles } from './required-field-mark.styles';

export const RequiredFieldMark = () => (
  <Tooltip title='Поле является обязательным' placement='right' arrow>
    <span style={styles.mark}>*</span>
  </Tooltip>
);
