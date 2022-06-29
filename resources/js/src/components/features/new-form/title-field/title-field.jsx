import React, { useId } from 'react';
import { observer } from 'mobx-react-lite';

import { form } from '@global-states';
import { useFormBuilder } from '@hooks';
import { titleFieldFormStructure } from '@constants';

import { FieldBox, ValidatedField } from '@components/reusable';
import styles from './title-field.module.scss';

export const NewFormTitleField = observer(() => {
  const formik = useFormBuilder('title-field')();
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
