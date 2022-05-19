import React from 'react';
import { Formik, Form, useFormik } from 'formik';
import { Button, Box, TextField, Select, MenuItem, Typography, Stack } from '@mui/material';

import { newField } from '../../domains/new-field';
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
            <TextField
              name="name"
              label="Название поля"
              value={formik.values.name}
              onChange={formik.handleChange}
              variant="standard"
              sx={ styles.field }
            />
            <TextField
              name="description"
              label="Описание"
              value={formik.values.description}
              variant="standard"
              onChange={formik.handleChange}
            />
              <Select
                value={ formik.values.type }
                label="Тип поля"
                variant="standard"
                onChange={ formik.handleChange }
              >
                <MenuItem value={ "text" }>Текст (text)</MenuItem>
                <MenuItem value={ "textarea" }>Текстовая зона (textarea)</MenuItem>
                <MenuItem value={ "select" }>Селектор (select)</MenuItem>
              </Select>
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
