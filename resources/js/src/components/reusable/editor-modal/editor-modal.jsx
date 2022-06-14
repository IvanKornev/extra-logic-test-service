import React from 'react';
import PropTypes from 'prop-types';
import generateId from 'uniqid';

import { buttons } from '@constants';
import { Modal, Box, Typography, Button, Stack } from '@mui/material';
import { Formik, Form } from 'formik';

import styles from './editor-modal.module.scss';

export const EditorModal = (props) => {
  const { title, form, abortCallback, disableCondition, isVisible, children } =
    props;
  return (
    <Modal
      open={isVisible}
      onClose={abortCallback}
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
                  id={`editor-modal__button_${button.action}`}
                  size='medium'
                  variant='contained'
                  color={button.color}
                  type={button.type}
                  disabled={button.canBeDisabled && disableCondition}
                  onClick={button.action === 'abort' && abortCallback}>
                  {button.text}
                </Button>
              ))}
            </Stack>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
};

EditorModal.propTypes = {
  title: PropTypes.string.isRequired,
  abortCallback: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  disableCondition: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  form: PropTypes.shape({
    initialValues: PropTypes.object.isRequired,
    formikInstance: PropTypes.object.isRequired,
  }),
};
