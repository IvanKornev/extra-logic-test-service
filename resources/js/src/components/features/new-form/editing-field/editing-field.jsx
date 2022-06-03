import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { useFormik, Formik, Form } from 'formik';
import generateId from 'uniqid';

import { fieldTypes, formFields } from '@constants';
import { LabledSwitch } from '@components/reusable';
import { fieldAttributes } from '@domains';

import { UilCheckCircle } from '@iconscout/react-unicons';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';

import { styles } from './editing-field.styles';

const NewFormEditingField = ({ field, updateAction }) => {
  const formik = useFormik({
    initialValues: field,
    onSubmit: (values) => {
      const { uniqueId } = field;
      updateAction((list) => list.change(uniqueId, values));
    },
  });
  return (
    <Formik initialValues={formik.initialValues} onSubmit={formik.handleSubmit}>
      <Form style={styles.wrapper}>
        {formFields.map((name) => {
          const id = useId();
          return (
            <TextField
              key={id}
              color='secondary'
              variant='standard'
              placeholder={field[name]}
              name={name}
              value={formik.values[name]}
              onChange={formik.handleChange}
              sx={styles.field}
            />
          );
        })}
        <FormControl size='small'>
          <Select
            name='type'
            onChange={formik.handleChange}
            value={formik.values.type}
            color='secondary'
            sx={styles.select}>
            {fieldTypes.map((type) => (
              <MenuItem value={type.value} key={generateId()}>
                {type.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div style={styles.footer}>
          {formik.dirty && (
            <Button
              startIcon={<UilCheckCircle />}
              type='submit'
              color='success'
              onClick={formik.changeHandler}>
              Сохранить
            </Button>
          )}
          <LabledSwitch
            defaultState={field.isRequired && true}
            label='Обязательный вопрос'
            name='isRequired'
            changeHandler={formik.handleChange}
          />
        </div>
      </Form>
    </Formik>
  );
};

NewFormEditingField.propTypes = {
  updateAction: PropTypes.func.isRequired,
  field: fieldAttributes,
};

export { NewFormEditingField };
