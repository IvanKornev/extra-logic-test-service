import React from 'react';

import { useNewForm, useFieldMenu } from '@hooks';
import { LinkedListConverter } from '@lib/converters';

import { NewFieldEditor } from '@components/features/editor';
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
              updateAction={updateFields}
              field={currentField}
              startFieldRef={refs.titleField}
            />
          }
          fieldBoxAction={selectField}
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
      <NewFieldEditor
        abortCallback={() => setEditorVisibility(false)}
        wasOpened={editorIsVisible}
        updateFields={updateFields}
      />
    </section>
  );
};

export { NewFormPage };
