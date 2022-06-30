import React, { useId } from 'react';
import { observer } from 'mobx-react-lite';

import { form as formState } from '@global-states';
import { useFormBuilder } from '@hooks';
import { formsStructure } from '@constants';

import { FieldBox, ValidatedField } from '@components/reusable';
import styles from './title-field.module.scss';

export const NewFormTitleField = observer(() => {
  const form = useFormBuilder('title-field')();
  return (
    <FieldBox
      additionalClasses={[
        styles['title-field'],
        !formState.selectedField
          ? 'new-form__field_selected'
          : 'new-form__field',
      ]}
      onClick={() => formState.selectField(null)}
      withBorder>
      {formsStructure.titleField.map((field) => (
        <ValidatedField
          key={useId()}
          field={field}
          className={styles[`title-field__field_${field.name}`]}
          formInstance={form}
          variant='standard'
        />
      ))}
    </FieldBox>
  );
});
