import React from 'react';
import { Formik, Form, useFormik } from 'formik';
import { Button, Box, TextField, Select, MenuItem, Typography, Stack } from '@mui/material';

import { Fields } from './blocks';
import { styles } from './field-editor.styles';

const FieldEditor = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      type: 'text',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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
            <Button size="medium" variant="contained" color="success" type="submit">
              Сохранить поле
            </Button>
            <Button size="medium" variant="contained" color="error">
              Отмена
            </Button>
          </Stack>
        </Form>
      </Formik>
    </Box>
  );
};

export { FieldEditor };
