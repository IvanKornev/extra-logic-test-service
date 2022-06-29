import React, { useId } from 'react';
import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';

import { form } from '@global-states';
import { fieldValidationSchema } from '@domains';
import { titleFieldFormStructure, formValues } from '@constants';

import { FieldBox, ValidatedField } from '@components/reusable';
import styles from './title-field.module.scss';

export const NewFormTitleField = observer(() => {
  const formik = useFormik({
    initialValues: formValues,
    validationSchema: fieldValidationSchema,
    onBlur: (values) => form.changeTitleField(values),
  });
  return (
    <FieldBox
      additionalClasses={[styles['title-field']]}
      onClick={() => form.selectField(null)}
      withBorder>
      {titleFieldFormStructure.map((field) => (
        <ValidatedField
          key={useId()}
          field={field}
          className={styles[`title-field__field_${field.name}`]}
          formikInstance={formik}
          variant='standard'
        />
      ))}
    </FieldBox>
  );
});
