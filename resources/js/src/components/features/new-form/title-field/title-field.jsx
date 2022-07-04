import React, { useId } from 'react';
import { observer } from 'mobx-react-lite';

import { form as formState } from '@global-states';
import { useFormBuilder } from '@hooks';
import { formsStructure } from '@constants';
import { getFieldClasses } from '@domains';

import { FieldBox, ValidatedField } from '@components/reusable';
import styles from './title-field.module.scss';

export const NewFormTitleField = observer(() => {
  const form = useFormBuilder('title-field')();
  const wasSelected = !formState.selectedField ? true : false;
  const classes = getFieldClasses(wasSelected, styles, 'title');
  return (
    <FieldBox
      additionalClasses={classes}
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
