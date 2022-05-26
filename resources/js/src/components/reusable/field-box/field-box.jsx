import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';
import { styles } from './field-box.styles';

const FieldBox = props => {
  const { children, withBorder, onClick } = props;
  const { box, borderedBox } = styles;
  return(
    <Box onClick={ onClick } sx={ withBorder ? borderedBox : box }>
      { children }
    </Box>
  );
};

FieldBox.defaultTypes = {
  withBorder: false,
};

FieldBox.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  withBorder: PropTypes.bool,
};

export { FieldBox };
