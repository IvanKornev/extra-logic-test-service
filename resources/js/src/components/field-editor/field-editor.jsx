import React from 'react';
import PropTypes from 'prop-types';

import { Formik, Form, useFormik } from 'formik';
import { Box, Typography, Stack } from '@mui/material';

import { Fields, ActionButtons } from './blocks';
import { newField } from '../../domains';
import { styles } from './field-editor.styles';

const FieldEditor = props => {
  const formik = useFormik({
    initialValues: newField.initValues,
    onSubmit: newField.create,
  });
  const { abortCallback } = props;
  return(
    <Box component="section" sx={ styles.box }>
      <Typography variant="h5" component="h5">
        Новое поле
      </Typography>
      <Formik onSubmit={ formik.handleSubmit }>
        <Form>
          <Stack direction="row" spacing={ 2 }>
            <Fields formikInstance={ formik } />
          </Stack>
          <Stack direction="row" spacing={2}>
            <ActionButtons abortCallback={ abortCallback } />
          </Stack>
        </Form>
      </Formik>
    </Box>
  );
};

FieldEditor.propTypes = {
  abortCallback: PropTypes.func.isRequired,
};

export { FieldEditor };
