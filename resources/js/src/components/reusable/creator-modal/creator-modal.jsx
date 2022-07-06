import React, { forwardRef, useId } from 'react';
import PropTypes from 'prop-types';

import { buttons } from '@constants';
import { useVisibilityManager } from '@hooks';

import { Modal, Box, Typography, Button, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import styles from './creator-modal.module.scss';

export const CreatorModal = forwardRef((props, ref) => {
  const {
    title,
    submitIsDisable,
    formInstance,
    children,
    creatingThing,
    onCloseCallback,
  } = props;
  const manager = useVisibilityManager(ref, onCloseCallback);
  const handleClick = (actionName) => {
    if (actionName === 'abort') {
      ref.current.close();
    }
    return undefined;
  };
  return (
    <Modal
      open={manager.isVisible}
      onClose={() => ref.current.close()}
      id={`creator-modal ${creatingThing}`}
      className={styles['creator-modal']}>
      <Box component='section' className={styles['creator-modal__box']}>
        <Typography variant='h5' component='h5'>
          {title}
        </Typography>
        <Formik
          initialValues={formInstance.initialValues}
          onSubmit={formInstance.handleSubmit}>
          <Form className={styles['creator-modal__form']}>
            <Stack direction='column'>{children}</Stack>
            <Stack
              className='creator-modal__buttons'
              direction='row'
              spacing={2}>
              {buttons.editorModal.map((button) => (
                <Button
                  key={useId()}
                  onClick={() => handleClick(button.action)}
                  id={`creator-modal__button_${button.action} ${creatingThing}`}
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

CreatorModal.defaultProps = {
  submitIsDisable: false,
};

CreatorModal.propTypes = {
  creatingThing: PropTypes.oneOf(['field', 'option']).isRequired,
  title: PropTypes.string.isRequired,
  onCloseCallback: PropTypes.func,
  submitIsDisable: PropTypes.bool,
  children: PropTypes.node.isRequired,
  formInstance: PropTypes.object.isRequired,
};
