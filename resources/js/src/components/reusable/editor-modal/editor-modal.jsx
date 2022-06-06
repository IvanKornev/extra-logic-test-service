import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Box, Typography, Button, Stack } from '@mui/material';
import { Formik, Form } from 'formik';

import { styles } from './editor-modal.styles';

export const EditorModal = (props) => {
  const { title, form, abortCallback, disableCondition, isVisible, children } =
    props;
  return (
    <Modal open={isVisible} onClose={abortCallback} sx={styles.modal}>
      <Box component='section' sx={styles.box}>
        <div
          style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
          <Typography variant='h5' component='h5'>
            {title}
          </Typography>
          <Formik
            initialValues={form.initialValues}
            onSubmit={form.formikInstance.handleSubmit}>
            <Form style={styles.form}>
              <Stack direction='column' spacing={2}>
                {children}
              </Stack>
              <Stack direction='row' spacing={2}>
                <Button
                  size='medium'
                  variant='contained'
                  color='success'
                  type='submit'
                  disabled={disableCondition}>
                  Сохранить
                </Button>
                <Button
                  size='medium'
                  variant='contained'
                  color='error'
                  onClick={abortCallback}>
                  Отмена
                </Button>
              </Stack>
            </Form>
          </Formik>
        </div>
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
