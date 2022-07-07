import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';
import styles from './field-box.module.scss';

const FieldBox = forwardRef((props, ref) => {
  const { children, withBorder, onClick, additionalClasses } = props;
  const boxClass = withBorder ? styles['box_bordered'] : styles['box_standard'];
  const allClasses = [boxClass, ...additionalClasses].join(' ');
  return (
    <Box ref={ref} onClick={onClick} className={allClasses}>
      {children}
    </Box>
  );
});

FieldBox.defaultProps = {
  withBorder: false,
  additionalClasses: [],
};

FieldBox.propTypes = {
  additionalClasses: PropTypes.array,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  withBorder: PropTypes.bool,
};

export { FieldBox };
