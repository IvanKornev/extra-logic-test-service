import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useVisibilityManager } from '@hooks';

import { Snackbar, Alert } from '@mui/material';
import styles from './event-message.module.scss';

export const EventMessage = forwardRef((props, ref) => {
  const { anchorOrigin, message, alertSeverity, withSnackbar, action } = props;
  return (
    <EventMessageSnackbar
      action={action}
      ref={ref}
      anchorOrigin={anchorOrigin}
      withSnackbar={withSnackbar}>
      <Alert
        className={styles['event-message__alert']}
        variant='filled'
        onClose={() => ref.current.close()}
        severity={alertSeverity}>
        <>
          {message}
          {action && (
            <button
              onClick={action.callback}
              className={styles['event-message__action']}>
              {action.title}
            </button>
          )}
        </>
      </Alert>
    </EventMessageSnackbar>
  );
});

const EventMessageSnackbar = forwardRef((props, ref) => {
  const { children, withSnackbar, anchorOrigin } = props;
  const autohideOptions = { isEnable: true, duration: 1500 };
  const manager = useVisibilityManager(ref, null, autohideOptions);
  if (!withSnackbar && manager.isVisible) {
    return children;
  }
  return (
    <Snackbar
      id='event-message'
      anchorOrigin={anchorOrigin}
      open={manager.isVisible}
      onClose={() => ref.current.close()}>
      {children}
    </Snackbar>
  );
});

EventMessage.defaultTypes = {
  withSnackbar: true,
  alertSeverity: 'success',
  anchorOrigin: PropTypes.shape({
    vertical: 'bottom',
    horizontal: 'right',
  }),
  action: null,
};

EventMessage.propTypes = {
  action: PropTypes.shape({
    title: PropTypes.string,
    callback: PropTypes.func,
  }),
  withSnackbar: PropTypes.bool,
  alertSeverity: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
  message: PropTypes.string.isRequired,
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.oneOf(['bottom', 'top']),
    horizontal: PropTypes.oneOf(['left', 'center', 'right']),
  }),
};
