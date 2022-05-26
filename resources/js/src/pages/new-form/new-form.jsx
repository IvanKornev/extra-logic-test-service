import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@mui/material';

import { FieldEditor } from '@components/features';
import { useNewForm } from '@hooks';
import {
  NewFormTitle,
  NewFormFields,
  NewFormMenu,
} from '@components/features/new-form';

import { styles } from './new-form.styles';

const NewFormPage = () => {
  let [editorIsVisible, setEditorVisibility] = useState(false);
  let [anchorElem, setAnchorElem] = useState(null);
  let { fields, updateFields, formik } = useNewForm();

  let titleElem = useRef(null);
  useEffect(() => {
    setAnchorElem(titleElem.current);
  }, []);

  return (
    <section style={styles.page}>
      <div style={styles.wrapper}>
        <NewFormTitle
          ref={titleElem}
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
