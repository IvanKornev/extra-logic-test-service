import React, { useId } from 'react';
import { Formik, Form } from 'formik';

import { observer } from 'mobx-react-lite';
import { selectHasOptions } from '@domains';
import { form as formState } from '@global-states';
import { fieldTypes, formFields } from '@constants';
import { useSelectOptionsHandler, useFormBuilder } from '@hooks';

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
  const { selectOptions } = formState.selectedField;
  const { optionsState, handlers } = useSelectOptionsHandler(selectOptions);
  const form = useFormBuilder('editing-field')(optionsState.list);

  const disableSubmitButton = () => {
    const { type, name, description } = form.values;
    if (type === 'select' && !selectHasOptions(optionsState.list)) {
      return true;
    }
    const inputsAreEmpty = name.length < 1 || description.length < 1;
    return inputsAreEmpty ? true : false;
  };
  return (
    <>
      <Formik initialValues={form.initialValues} onSubmit={form.handleSubmit}>
        <Form className={styles['editing-field__wrapper']}>
          {formFields.map((name) => {
            const id = useId();
            return (
              <TextField
                key={id}
                id={`editing-field__field_${name}`}
                color='secondary'
                variant='standard'
                placeholder={formState.selectedField[name]}
                name={name}
                value={form.values[name]}
                onChange={form.handleChange}
              />
            );
          })}
          <FormControl size='small'>
            <Select
              name='type'
              onChange={form.handleChange}
              value={form.values.type}
              color='secondary'>
              {fieldTypes.map((type) => (
                <MenuItem value={type.value} key={useId()}>
                  {type.title}
                </MenuItem>
              ))}
            </Select>
            {form.values.type === 'select' && (
              <OptionsList
                scrollbarColor='purple'
                list={optionsState.list}
                handlers={handlers}
              />
            )}
          </FormControl>
          <div className={styles['editing-field__footer']}>
            <LabledSwitch
              id='editing-field__switch_make-require'
              defaultState={formState.selectedField.isRequired && true}
              label='Обязательное'
              name='isRequired'
              changeHandler={form.handleChange}
            />
            {(form.dirty || optionsState.wasUpdated) && (
              <Button
                className={styles['editing-field__button_save']}
                id='editing-field__button_save'
                startIcon={<UilCheckCircle />}
                type='submit'
                color='success'
                disabled={disableSubmitButton()}
                onClick={form.changeHandler}
              />
            )}
          </div>
        </Form>
      </Formik>
    </>
  );
});

export { NewFormEditingField };
