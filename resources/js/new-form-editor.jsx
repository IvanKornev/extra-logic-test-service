import React, { useState } from 'react';
import { Formik, Form } from 'formik';

const NewFormEditor = () => {
  let [newFormFields, updateNewFormFields] = useState({
    title: 'Новая форма',
    fields: [],
  });
  let [editorIsVisible, setEditorVisibility] = useState(false);

  const showEditor = event => {
    event.preventDefault();
    setEditorVisibility(true);
  };

  const hideEditor = event => {
    event.preventDefault();
    setEditorVisibility(false);
  };

  const saveField = event => {
    event.preventDefault();
  };

  const saveForm = values => {
    console.log(values);
  };

  return(
    <main>
      <Formik initialValues={ newFormFields } onSubmit={saveForm}>
       <Form>
        <div>
          <h1>{ newFormFields.title }</h1>
        </div>
        <div>
          { newFormFields.fields.length !== 0 && newFormFields.fields.map((field) => (
            <div>
              <h5>Название поля: { field.name }</h5>
              <h5>Описание поля: { field.description }</h5>
              <h5>Тип поля: { field.type }</h5>
            </div>
          ))}
        </div>
        { editorIsVisible && (
          <div>
            <input type="text" placeholder="Название поля" />
            <input type="text" placeholder="Описание поля" />
            <select>
              <option>Text</option>
              <option>TextArea</option>
              <option>Select</option>
            </select>
            <div>
              <button onClick={e => saveField(e)}>
                Сохранить поле
              </button>
              <button onClick={e => hideEditor(e)}>
                Отмена
              </button>
            </div>
          </div>
        )}
        <button onClick={e => showEditor(e)}>
          Добавить поле
        </button>
        <button type="submit">
          Сохранить форму
        </button>
       </Form>
     </Formik>
    </main>
  );
};

export { NewFormEditor };
