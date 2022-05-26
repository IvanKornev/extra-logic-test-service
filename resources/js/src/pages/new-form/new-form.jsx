import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useFormik } from 'formik';

import { FieldEditor } from '@components/features';
import { NewFormTitle, NewFormFields } from '@components/features/new-form';
import { styles } from './new-form.styles';

const NewFormPage = () => {
  let [fields, updateFields] = useState([]);
  let [editorIsVisible, setEditorVisibility] = useState(false);

  const formik = useFormik({
    initialValues: {
      form: {
        name: 'Новая форма',
        description: 'Описание новой формы',
      },
    },
    onSubmit: (values) => console.log(values),
  });

  return (
    <section style={ styles.page }>
      <div style={ styles.wrapper }>
        <NewFormTitle formikInstance={ formik } />
        <NewFormFields fields={ fields } />
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
