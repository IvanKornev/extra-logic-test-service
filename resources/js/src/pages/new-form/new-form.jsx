import React, { useState } from 'react';
import { Button } from '@mui/material';

import { FieldEditor } from '@components/features';
import { useNewForm } from '@hooks';
import {
  NewFormTitle, NewFormFields, NewFormMenu,
} from '@components/features/new-form';

import { styles } from './new-form.styles';

const NewFormPage = () => {
  let [editorIsVisible, setEditorVisibility] = useState(false);
  let [anchorElem, setAnchorElem] = useState(null);
  let { fields, updateFields, formik } = useNewForm();
  return (
    <section style={ styles.page }>
      <div style={ styles.wrapper }>
        <NewFormTitle
          onClick={(e) => setAnchorElem(e.currentTarget)}
          formikInstance={ formik }
        />
        <NewFormFields fields={ fields } />
        <NewFormMenu anchorEl={ anchorElem } />
        <Button
          variant='contained'
          type='button'
          onClick={() => setEditorVisibility(true)}>
          Добавить поле
        </Button>
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
