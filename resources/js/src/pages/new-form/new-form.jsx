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

const NewFormPage = () => {
  const { fields, updateFields, formik } = useNewForm();
  const {
    actions,
    setCurrentField,
    currentField,
    setEditorVisibility,
    editorIsVisible,
  } = useFieldMenu(updateFields);
  return (
    <section style={styles.page}>
      <NewFormFields
        selectedFieldComponent={
          <NewFormEditingField
            updateAction={updateFields}
            field={currentField}
            setCurrentField={setCurrentField}
          />
        }
        fieldBoxAction={setCurrentField}
        currentField={currentField}
        fields={LinkedListConverter.toArray(fields)}
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
};

export { NewFormPage };
