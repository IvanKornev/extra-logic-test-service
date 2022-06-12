import React, { useState, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from '@mui/material';

export const EventSnackbar = forwardRef((props, ref) => {
  const { anchorOrigin, message } = props;
  const [isVisible, setVisibility] = useState(false);
  useImperativeHandle(ref, () => ({
    show: () => setVisibility(true),
    close: () => setVisibility(false),
  }));
  return(
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={isVisible}
      onClose={() => setVisibility(false)}
      autoHideDuration={2500}
      message={message}
    />
  );
});

EventSnackbar.defaultTypes = {
  anchorOrigin: PropTypes.shape({
    vertical: 'bottom',
    horizontal: 'right',
  }),
};

EventSnackbar.propTypes = {
  message: PropTypes.string.isRequired,
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.oneOf(['bottom', 'top']),
    horizontal: PropTypes.oneOf(['left', 'center', 'right']),
  }),
};
