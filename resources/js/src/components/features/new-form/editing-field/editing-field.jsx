import React, { useId } from 'react';
import { useFormik, Formik, Form } from 'formik';

import { observer } from 'mobx-react-lite';
import { selectHasOptions } from '@domains';
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
  const { optionsState, handlers } = useSelectOptionsHandler(selectOptions);
  const formik = useFormik({
    initialValues: form.selectedField,
    onSubmit: (values) => {
      const data = { ...values, selectOptions: optionsState.list };
      form.changeField(form.selectedField.uniqueId, data);
    },
  });
  const disableSubmitButton = () => {
    const { type, name, description } = formik.values;
    const inputsAreEmpty = name.length < 1 || description.length < 1;
    const hasOptions = selectHasOptions(type, optionsState.list);
    return (!hasOptions || inputsAreEmpty) ? true : false;
  };
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
                <MenuItem value={type.value} key={useId()}>
                  {type.title}
                </MenuItem>
              ))}
            </Select>
            {formik.values.type === 'select' && (
              <OptionsList
                scrollbarColor='purple'
                list={optionsState.list}
                handlers={handlers}
              />
            )}
          </FormControl>
          <div className={styles['editing-field__footer']}>
            {(formik.dirty || optionsState.wasUpdated) && (
              <Button
                id='editing-field__button_save'
                startIcon={<UilCheckCircle />}
                type='submit'
                color='success'
                disabled={disableSubmitButton()}
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
