import React from 'react';
import { useFormik, Formik, Form } from 'formik';
import generateId from 'uniqid';

import { fieldEditor } from '@domains';
import { LabledSwitch } from '@components/reusable';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';

import { styles } from './editing-field.styles';

export const NewFormEditingField = ({ field, callbacks }) => {
  const formik = useFormik({
    initialValues: {
        name: field.name,
        description: field.description,
        type: field.type,
      },
      onSubmit: (values) => alert( JSON.stringify(values, null, 2)),
    });
    return(
      <Formik
        initialValues={formik.initialValues}
        onSubmit={formik.handleSubmit}>
        <Form style={styles.wrapper}>
          <TextField
            color='secondary'
            variant='standard'
            placeholder={field.name}
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            sx={styles.field}
          />
          <TextField
            color='secondary'
            variant='standard'
            placeholder={field.description}
            name="name"
            value={formik.values.description}
            onChange={formik.handleChange}
            sx={styles.field}
          />
          <FormControl size='small'>
            <Select value={field.type} color='secondary' sx={styles.select}>
              {fieldEditor.types.map((type) => (
                <MenuItem
                  value={type.value}
                  key={generateId()}>
                  {type.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
            <LabledSwitch
              defaultState={field.isRequired && true}
              label="Обязательный вопрос"
              changeHandler={callbacks.switch}
            />
            <Button
              type="submit"
              onClick={formik.changeHandler}>
              Сохранить
            </Button>
          </div>
      </Form>
    </Formik>
  );
};
