import React, { useId, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { formsStructure, initialValues, buttons } from '@constants';
import { useFormBuilder, useVisibilityManager } from '@hooks';

import { Formik, Form } from 'formik';
import { ValidatedField } from '@components/reusable';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
} from '@mui/material';

export const UserDialog = forwardRef((props, ref) => {
  const { actionType } = props;
  const form = useFormBuilder(actionType)();
  const manager = useVisibilityManager(ref, form.resetForm);
  const { dialog } = initialValues.user;
  return (
    <Dialog
      open={manager.isVisible}
      TransitionComponent={DialogTransition}
      onClose={() => ref.current.close()}>
      <DialogTitle>{dialog.title[actionType]}</DialogTitle>
      <Formik initialValues={form.initialValues} onSubmit={form.handleSubmit}>
        <Form>
          <DialogContent>
            {formsStructure.user[actionType].map((field) => (
              <ValidatedField formInstance={form} key={useId()} field={field} />
            ))}
          </DialogContent>
          <DialogActions>
            <Button variant='outlined' color='success' type='submit'>
              {dialog.submitButton[actionType]}
            </Button>
            <Button variant='outlined' color='error'>
              {dialog.closeButton[actionType]}
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
});

const DialogTransition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

UserDialog.defaultProps = {
  actionType: 'authorization',
};

UserDialog.propTypes = {
  actionType: PropTypes.oneOf(['authorization', 'registration']),
};
