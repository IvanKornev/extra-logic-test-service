import React, { useId } from 'react';
import { observer } from 'mobx-react-lite';
import { Formik, Form } from 'formik';

import { formState } from '@global-states';
import { useFormBuilder } from '@hooks';
import { formsStructure } from '@constants';
import { getFieldClasses } from '@entities';

import { Button } from '@mui/material';
import { FieldBox, ValidatedField } from '@components/reusable';
import styles from './title-field.module.scss';

export const FormTitleField = observer(() => {
  const form = useFormBuilder('title-field')(formState.titleField);
  const wasSelected = !formState.selectedField ? true : false;
  const classes = getFieldClasses(wasSelected, styles, 'title');
  const { initialValues, handleSubmit } = form;
  return (
    <FieldBox
      additionalClasses={classes}
      onClick={() => formState.selectField(null)}
      withBorder>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          {formsStructure.titleField.map((field) => (
            <ValidatedField
              key={useId()}
              field={field}
              className={styles[`title-field__field_${field.name}`]}
              formInstance={form}
              variant='standard'
            />
          ))}
          {form.dirty && (
            <Button
              className={styles['title-field__button_submit']}
              type='submit'
              color='success'
              variant='outlined'>
              Сохранить
            </Button>
          )}
        </Form>
      </Formik>
    </FieldBox>
  );
});
