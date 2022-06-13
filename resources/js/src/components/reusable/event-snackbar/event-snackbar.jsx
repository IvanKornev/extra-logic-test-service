import React, { useState, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Snackbar, Alert } from '@mui/material';

export const EventSnackbar = forwardRef((props, ref) => {
  const [isVisible, setVisibility] = useState(false);
  useImperativeHandle(ref, () => ({
    show: () => setVisibility(true),
    close: () => setVisibility(false),
  }));
  const { anchorOrigin, message, alertSeverity } = props;
  return (
    <Snackbar
      id='event-snackbar'
      anchorOrigin={anchorOrigin}
      open={isVisible}
      onClose={() => setVisibility(false)}
      autoHideDuration={1500}>
      <Alert onClose={() => setVisibility(false)} severity={alertSeverity}>
        {message}
      </Alert>
    </Snackbar>
  );
});

EventSnackbar.defaultTypes = {
  alertSeverity: 'success',
  anchorOrigin: PropTypes.shape({
    vertical: 'bottom',
    horizontal: 'right',
  }),
};

EventSnackbar.propTypes = {
  alertSeverity: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
  message: PropTypes.string.isRequired,
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.oneOf(['bottom', 'top']),
    horizontal: PropTypes.oneOf(['left', 'center', 'right']),
  }),
};
