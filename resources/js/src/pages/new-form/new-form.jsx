import React from 'react';

import { FieldEditor } from '@components/features';
import { useNewForm, useFieldMenu } from '@hooks';
import { fieldEditor } from '@domains/field-editor';
import { LinkedListConverter } from '@lib/converters';
import {
  NewFormTitle,
  NewFormFields,
  NewFormMenu,
  NewFormEditingField,
} from '@components/features/new-form';

import { styles } from './new-form.styles';

const NewFormPage = () => {
  const { fields, updateFields, formik } = useNewForm();
  const {
    refs,
    anchorElem,
    actions,
    selectField,
    currentField,
    setEditorVisibility,
    editorIsVisible,
  } = useFieldMenu(updateFields);

  const fieldsCallbacks = {
    switch: () => (
      fieldEditor.makeRequired(currentField.uniqueId, updateFields)
    ),
    fieldBox: selectField,
  };
  return (
    <section style={styles.page}>
      <div style={styles.wrapper}>
        <NewFormTitle
          ref={refs.titleField}
          onClick={(e) => selectField(e)}
          formikInstance={formik}
        />
        <NewFormFields
          selectedFieldComponent={
            <NewFormEditingField
              callbacks={fieldsCallbacks}
              field={currentField}
            />
          }
          callbacks={fieldsCallbacks}
          currentField={currentField}
          outsideRef={refs.mainField}
          fields={LinkedListConverter.toArray(fields)}
        />
        <NewFormMenu
          onlyAddOption={!currentField && true}
          actions={actions}
          anchorElem={anchorElem}
        />
      </div>
      <FieldEditor
        abortCallback={() => setEditorVisibility(false)}
        wasOpened={editorIsVisible}
        updateFields={updateFields}
      />
    </section>
  );
};

export { NewFormPage };
