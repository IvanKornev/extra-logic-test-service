import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';
import { styles } from './field-box.styles';

const FieldBox = props => {
  const { children, withBorder } = props;
  const { box, borderedBox } = styles;
  return(
    <Box sx={ withBorder ? borderedBox : box }>
      { children }
    </Box>
  );
};

FieldBox.defaultTypes = {
  withBorder: false,
};

FieldBox.propTypes = {
  children: PropTypes.node.isRequired,
  withBorder: PropTypes.bool,
};

export { FieldBox };
