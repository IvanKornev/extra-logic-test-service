import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useVisibilityManager } from '@hooks';
import { Snackbar, Alert } from '@mui/material';

export const EventSnackbar = forwardRef((props, ref) => {
  const { anchorOrigin, message, alertSeverity } = props;
  const manager = useVisibilityManager(ref);
  return (
    <Snackbar
      id='event-snackbar'
      anchorOrigin={anchorOrigin}
      open={manager.isVisible}
      onClose={() => ref.current.close()}
      autoHideDuration={1500}>
      <Alert onClose={() => ref.current.close()} severity={alertSeverity}>
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
