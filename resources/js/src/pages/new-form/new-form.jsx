import React, { useState, useRef } from 'react';

import { FieldEditor } from '@components/features';
import { useNewForm, useAnchorElem } from '@hooks';
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

  const makeFieldRequired = () => {
    alert('Поле сделано обязательным');
  };

  const fieldRef = useRef(null);
  const menuCallbacks = {
    add: () => setEditorVisibility(true),
    copy: () => {
      updateFields((list) => {
        let results = list.copy(currentField.uniqueId);
        setCurrentField(results.copiedValue);
        return results.list;
      });
    },
    remove: () => {
      updateFields((list) => list.remove(currentField.uniqueId));
      const hasFields = fields.toArray().length >= 1;
      if (hasFields) {
        return fieldRef.current.click();
      }
      titleFieldRef.current.click();
    }
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
          callbacks={{
            switch: makeFieldRequired,
            fieldBox: selectField,
          }}
          currentField={currentField}
          outsideRef={fieldRef}
          fields={fields.toArray()}
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
