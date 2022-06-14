import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';
import styles from './field-box.module.scss';

const FieldBox = forwardRef((props, ref) => {
  const { children, withBorder, onClick } = props;
  const boxClass = withBorder ? styles['box_bordered'] : styles['box_standard'];
  return (
    <Box ref={ref} onClick={onClick} className={boxClass}>
      {children}
    </Box>
  );
});

FieldBox.defaultTypes = {
  withBorder: false,
};

FieldBox.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  withBorder: PropTypes.bool,
};

export { FieldBox };
