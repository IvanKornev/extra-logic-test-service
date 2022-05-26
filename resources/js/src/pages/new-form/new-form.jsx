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
  let { fields, updateFields, formik } = useNewForm();
  let { anchorElem, setAnchorElem, startElem } = useAnchorElem();

  return (
    <section style={styles.page}>
      <div style={styles.wrapper}>
        <NewFormTitle
          ref={startElem}
          onClick={(e) => setAnchorElem(e.currentTarget)}
          formikInstance={formik}
        />
        <NewFormFields
          anchorCallback={(e) => setAnchorElem(e.currentTarget)}
          fields={fields}
        />
        <NewFormMenu
          actionsCallbacks={{
            add: () => setEditorVisibility(true),
            edit: () => alert('Редактирование'),
            copy: () => alert('Копирование'),
            remove: () => alert('Удаление'),
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
