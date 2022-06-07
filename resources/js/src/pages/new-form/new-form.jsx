import React from 'react';

import { useNewForm, useFieldMenu } from '@hooks';
import { LinkedListConverter } from '@lib/converters';

import { NewFieldEditor } from '@components/features/editor';
import {
  NewFormFields,
  NewFormMenu,
  NewFormEditingField,
} from '@components/features/new-form';

import { styles } from './new-form.styles';
import { observer } from 'mobx-react-lite';
import { form } from '@global-states';

const NewFormPage = observer(() => {
  const { fields, updateFields, formik } = useNewForm();
  const {
    actions,
    setCurrentField,
    currentField,
    setEditorVisibility,
    editorIsVisible,
  } = useFieldMenu();
  return (
    <section style={styles.page}>
      <NewFormFields
        selectedFieldComponent={
          <NewFormEditingField actions={{ updateFields, setCurrentField }} />
        }
        currentField={currentField}
        fields={LinkedListConverter.toArray(form.fieldsList)}
        formikInstance={formik}>
        <NewFormMenu actions={actions} onlyAddOption={!currentField && true} />
      </NewFormFields>
      <NewFieldEditor
        abortCallback={() => setEditorVisibility(false)}
        wasOpened={editorIsVisible}
        updateFields={updateFields}
      />
    </section>
  );
});

export { NewFormPage };
