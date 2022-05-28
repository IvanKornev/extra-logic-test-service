import React, { useState } from 'react';

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
  let [currentField, setCurrentField] = useState({});

  let { fields, updateFields, formik } = useNewForm();
  let { anchorElem, setAnchorElem, startElem } = useAnchorElem();

  const selectField = (field, event) => {
    setCurrentField(field);
    setAnchorElem(event.currentTarget);
  };

  return (
    <section style={styles.page}>
      <div style={styles.wrapper}>
        <NewFormTitle
          ref={startElem}
          onClick={(e) => setAnchorElem(e.currentTarget)}
          formikInstance={formik}
        />
        <NewFormFields
          selectCallback={selectField}
          fields={fields.toArray()}
        />
        <NewFormMenu
          actionsCallbacks={{
            add: () => setEditorVisibility(true),
            edit: () => alert('Редактирование'),
            copy: () => {
              updateFields((list) => {
                let results = list.copy(currentField.uniqueId);
                setCurrentField(results.copiedValue);
                return results.list;
              });
            },
            remove: () => {
              updateFields((list) => list.remove(currentField.uniqueId));
            }
          }}
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
