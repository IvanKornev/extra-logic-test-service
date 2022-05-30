import React, { useState, useRef } from 'react';

import { FieldEditor } from '@components/features';
import { useNewForm, useAnchorElem } from '@hooks';
import { fieldEditor } from '@domains/field-editor';
import { LinkedListConverter } from '@lib/converters';
import {
  NewFormTitle,
  NewFormFields,
  NewFormMenu,
} from '@components/features/new-form';

import { styles } from './new-form.styles';

const NewFormPage = () => {
  let [editorIsVisible, setEditorVisibility] = useState(false);
  let [currentField, setCurrentField] = useState(null);

  let { fields, updateFields, formik } = useNewForm();
  let { anchorElem, setAnchorElem, titleFieldRef } = useAnchorElem();

  const selectField = (event, field = null) => {
    setCurrentField(field);
    setAnchorElem(event.currentTarget);
  };

  const mainFieldRef = useRef(null);
  const menuCallbacks = {
    add: () => setEditorVisibility(true),
    copy: () => fieldEditor.copy(updateFields, {
      fieldState: currentField,
      fieldAction: setCurrentField,
    }),
    remove: () => fieldEditor.remove(currentField.uniqueId, updateFields, {
      mainFieldRef, titleFieldRef,
    }),
  };

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
          ref={titleFieldRef}
          onClick={(e) => selectField(e)}
          formikInstance={formik}
        />
        <NewFormFields
          callbacks={fieldsCallbacks}
          currentField={currentField}
          outsideRef={mainFieldRef}
          fields={LinkedListConverter.toArray(fields)}
        />
        <NewFormMenu
          onlyAddOption={!currentField && true}
          actionsCallbacks={menuCallbacks}
          anchorElem={anchorElem}
        />
      </div>
      {editorIsVisible && (
        <FieldEditor
          updateFields={updateFields}
          wasOpened={editorIsVisible}
          abortCallback={() => setEditorVisibility(false)}
        />
      )}
    </section>
  );
};

export { NewFormPage };
