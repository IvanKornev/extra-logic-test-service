import React, { useId } from 'react';
import { Formik, Form } from 'formik';

import { observer } from 'mobx-react-lite';
import { selectIsEmpty } from '@entities';
import { form as formState } from '@global-states';
import { formsStructure } from '@constants';
import { useSelectOptionsHandler, useFormBuilder } from '@hooks';

import { UilCheckCircle } from '@iconscout/react-unicons';
import styles from './editing-field.module.scss';
import { Button } from '@mui/material';
import {
  LabledSwitch,
  OptionsList,
  ValidatedField,
} from '@components/reusable';

const NewFormEditingField = observer(() => {
  const { selectOptions } = formState.selectedField;
  const { optionsState, handlers } = useSelectOptionsHandler(selectOptions);

  const { list } = optionsState;
  const form = useFormBuilder('editing-field')(list);
  const disableCondition = selectIsEmpty(form.values.type, list);
  return (
    <>
      <Formik initialValues={form.initialValues} onSubmit={form.handleSubmit}>
        <Form className={styles['editing-field__wrapper']}>
          {formsStructure.field.map((field) => {
            const id = useId();
            const placeholder = formState.selectedField[field.name];
            return (
              <ValidatedField
                key={id}
                id={`editing-field__field_${field.name}`}
                variant='standard'
                field={{ ...field, placeholder }}
                formInstance={form}
              />
            );
          })}
          {form.values.type === 'select' && (
            <OptionsList
              scrollbarColor='purple'
              list={optionsState.list}
              handlers={handlers}
            />
          )}
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
                disabled={disableCondition}
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
