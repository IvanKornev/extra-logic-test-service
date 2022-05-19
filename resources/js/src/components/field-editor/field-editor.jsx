import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Box } from '@mui/material';

import { newField } from '../../domains/new-field';
import { styles } from './field-editor.styles';

const FieldEditor = () => {
  return(
    <Box component="section" sx={ styles.box }>
      <Formik initialValues={ newField.initValues } onSubmit={ newField.create }>
        <Form>
          <Field name="name" placeholder="Название поля" />
          <Field name="description" placeholder="Описание поля" />
          <Field as="select" name="type">
            <option value="text">Text</option>
            <option value="textarea">TextArea</option>
            <option value="select">Select</option>
          </Field>
          <div>
            <Button variant="outlined" color="success" type="submit">
              Сохранить поле
            </Button>
            <Button variant="outlined" color="error">
              Отмена
            </Button>
          </div>
        </Form>
      </Formik>
    </Box>
  );
};

export { FieldEditor };
