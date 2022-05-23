import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useFormik } from 'formik';

import { FieldEditor } from '@components/features';
import { NewFormTitle, NewFormFields } from '@components/features/new-form';

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
    <section style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'inline-flex', flexDirection: 'column', rowGap: '12px', marginTop: '12px' }}>
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
