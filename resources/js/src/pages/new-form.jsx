import React, { useState } from 'react';

import { Typography, Button } from '@mui/material';
import { formService } from '@services';
import { FieldEditor } from '@components/features';
import { newForm } from '@domains';

const NewFormPage = () => {
  let [fields, updateFields] = useState([]);
  let [editorIsVisible, setEditorVisibility] = useState(false);
  return (
    <section>
      <div>
        <Typography variant='h4' component='h1'>
          Новая форма
        </Typography>
      </div>
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
