import React, { useId } from 'react';
import { useFormik, Formik, Form } from 'formik';
import generateId from 'uniqid';

import { observer } from 'mobx-react-lite';
import { form } from '@global-states';
import { fieldTypes, formFields } from '@constants';
import { useSelectOptionsHandler } from '@hooks';

import { LabledSwitch, OptionsList } from '@components/reusable';
import { UilCheckCircle } from '@iconscout/react-unicons';
import styles from './editing-field.module.scss';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';

const NewFormEditingField = observer(() => {
  const { selectOptions } = form.selectedField;
  const { optionsList, handlers } = useSelectOptionsHandler(selectOptions);
  const formik = useFormik({
    initialValues: form.selectedField,
    onSubmit: (values) => {
      const { uniqueId } = form.selectedField;
      if (optionsList) {
        values.selectOptions = optionsList;
      }
      form.changeField(uniqueId, values);
    },
  });
  return (
    <>
      <Formik
        initialValues={formik.initialValues}
        onSubmit={formik.handleSubmit}>
        <Form className={styles['editing-field__wrapper']}>
          {formFields.map((name) => {
            const id = useId();
            return (
              <TextField
                key={id}
                id={`editing-field__field_${name}`}
                color='secondary'
                variant='standard'
                placeholder={form.selectedField[name]}
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
              />
            );
          })}
          <FormControl size='small'>
            <Select
              name='type'
              onChange={formik.handleChange}
              value={formik.values.type}
              color='secondary'>
              {fieldTypes.map((type) => (
                <MenuItem value={type.value} key={generateId()}>
                  {type.title}
                </MenuItem>
              ))}
            </Select>
            {formik.values.type === 'select' && (
              <OptionsList
                scrollbarColor='purple'
                list={optionsList}
                handlers={handlers}
              />
            )}
          </FormControl>
          <div className={styles['editing-field__footer']}>
            {formik.dirty && (
              <Button
                id='editing-field__button_save'
                startIcon={<UilCheckCircle />}
                type='submit'
                color='success'
                onClick={formik.changeHandler}>
                Сохранить
              </Button>
            )}
            <LabledSwitch
              defaultState={form.selectedField.isRequired && true}
              label='Обязательное поле'
              name='isRequired'
              changeHandler={formik.handleChange}
            />
          </div>
        </Form>
      </Formik>
    </>
  );
});

export { NewFormEditingField };
