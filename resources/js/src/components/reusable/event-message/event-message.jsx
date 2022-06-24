import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useVisibilityManager } from '@hooks';

import { Snackbar, Alert } from '@mui/material';
import styles from './event-message.module.scss';

export const EventMessage = forwardRef((props, ref) => {
  const { anchorOrigin, message, alertSeverity, withSnackbar } = props;
  const manager = useVisibilityManager(ref);
  // useEffect(() => {
  //   if (!withSnackbar) {
  //     setTimeout(() => ref.current.close(), 2000);
  //   }
  // }, [message]);
  return (
    <>
      {withSnackbar && (
        <Snackbar
          id='event-message'
          anchorOrigin={anchorOrigin}
          open={manager.isVisible}
          onClose={() => ref.current.close()}
          autoHideDuration={1500}>
          <Alert
            className={styles['event-message__alert']}
            variant='filled'
            onClose={() => ref.current.close()}
            severity={alertSeverity}>
            {message}
          </Alert>
        </Snackbar>
      )}
      {!withSnackbar && (
        <>
          {manager.isVisible && (
            <Alert
              className={styles['event-message__alert']}
              variant='filled'
              onClose={() => ref.current.close()}
              severity={alertSeverity}>
              {message}
            </Alert>
          )}
        </>
      )}
    </>
  );
});

EventMessage.defaultTypes = {
  withSnackbar: true,
  alertSeverity: 'success',
  anchorOrigin: PropTypes.shape({
    vertical: 'bottom',
    horizontal: 'right',
  }),
};

EventMessage.propTypes = {
  withSnackbar: PropTypes.bool,
  alertSeverity: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
  message: PropTypes.string.isRequired,
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.oneOf(['bottom', 'top']),
    horizontal: PropTypes.oneOf(['left', 'center', 'right']),
  }),
};
