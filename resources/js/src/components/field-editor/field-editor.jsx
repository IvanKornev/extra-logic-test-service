import React from 'react';
import { Formik, Form, useFormik } from 'formik';
import { Button, Box, TextField, Select, MenuItem, Typography, Stack } from '@mui/material';

import { newField, fieldEditor } from '../../domains';
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
            { fieldEditor.fields.map((field) => {
              const { name, label, component } = field;
              const CurrentComponent = component.name;
              return(
                <CurrentComponent
                  name={ name }
                  label={ label }
                  value={ formik.values[name] }
                  variant="standard"
                  onChange={ formik.handleChange }
                >
                  { component.name === Select && component.options.map((option) => (
                    <MenuItem value={ option.value }>{ option.title }</MenuItem>
                  ))}
                </CurrentComponent>
              );
            })}
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
