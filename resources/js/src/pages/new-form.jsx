import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useFormik } from 'formik';

import { FieldEditor } from '@components/features';
import { NewFormTitle } from '@components/features/new-form';

import { formService } from '@services';
import { newForm } from '@domains';

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
    <section>
      <NewFormTitle formikInstance={ formik } />
      <div>
        {fields.length !== 0 &&
          fields.map((field) => (
            <div key={field.uniqueId}>
              <div>
                <h5>Название поля: {field.name}</h5>
                <h5>Описание поля: {field.description}</h5>
                <h5>Тип поля: {field.type}</h5>
                {field.type === 'select' && (
                  <h5>
                    Опции селектора:{' '}
                    {JSON.stringify(field.selectOptions, null, 2)}
                  </h5>
                )}
              </div>
            </div>
          ))}
      </div>
      {editorIsVisible && (
        <FieldEditor
          updateFields={updateFields}
          wasOpened={editorIsVisible}
          abortCallback={() => setEditorVisibility(false)}
        />
      )}
      <Button
        variant='contained'
        type='button'
        onClick={() => setEditorVisibility(true)}>
        Добавить поле
      </Button>
      <Button
        variant='contained'
        onClick={() => formService.save(fields)}
        disabled={newForm.isEmpty(fields)}>
        Сохранить форму
      </Button>
    </section>
  );
};

export { NewFormPage };
