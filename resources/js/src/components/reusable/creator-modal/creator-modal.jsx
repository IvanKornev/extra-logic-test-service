import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import generateId from 'uniqid';

import { buttons } from '@constants';
import { useVisibilityManager } from '@hooks';

import { Modal, Box, Typography, Button, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import styles from './creator-modal.module.scss';

export const CreatorModal = forwardRef((props, ref) => {
  const { title, submitIsDisable, form, children } = props;
  const manager = useVisibilityManager(ref);
  const handleClick = (actionName) => {
    if (actionName === 'abort') {
      ref.current.close();
    }
    return undefined;
  }
  return (
    <Modal
      open={manager.isVisible}
      onClose={() => ref.current.close()}
      className={styles['editor-modal']}>
      <Box component='section' className={styles['editor-modal__box']}>
        <Typography variant='h5' component='h5'>
          {title}
        </Typography>
        <Formik
          initialValues={form.initialValues}
          onSubmit={form.formikInstance.handleSubmit}>
          <Form className={styles['editor-modal__form']}>
            <Stack direction='column' spacing={2}>
              {children}
            </Stack>
            <Stack direction='row' spacing={2}>
              {buttons.editorModal.map((button) => (
                <Button
                  key={generateId()}
                  onClick={() => handleClick(button.action)}
                  id={`editor-modal__button_${button.action}`}
                  size='medium'
                  variant='contained'
                  color={button.color}
                  type={button.type}
                  disabled={button.canBeDisabled && submitIsDisable}>
                  {button.text}
                </Button>
              ))}
            </Stack>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
});

CreatorModal.propTypes = {
  title: PropTypes.string.isRequired,
  submitIsDisable: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  form: PropTypes.shape({
    initialValues: PropTypes.object.isRequired,
    formikInstance: PropTypes.object.isRequired,
  }),
};
