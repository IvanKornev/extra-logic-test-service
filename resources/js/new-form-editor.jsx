import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { v4 as generateUuid } from 'uuid'; 

import { newForm } from './src/domains';
import { formService } from './src/services';

const NewFormEditor = () => {
  let [newFormFields, updateNewFormFields] = useState(newForm.fieldsInitialValues);

  let [editorIsVisible, setEditorVisibility] = useState(false);
  let [name, setName] = useState('');
  let [description, setDescription] = useState('');
  let [type, setType] = useState('text');

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
    const savingField = {
      uniqueId: generateUuid(),
      name: name || 'Имя по умолчанию',
      description: description || 'Описание по умолчанию',
      type, 
    };

    updateNewFormFields({ title: newFormFields.title, fields: [
      ...newFormFields.fields, savingField,
    ]});
    setEditorVisibility(false);
  };

  const deleteField = (event, uniqueId) => {
    event.preventDefault();
    const updatedFields = newFormFields.fields.filter(field => field.uniqueId !== uniqueId);
    updateNewFormFields({ ...newFormFields.title, fields: updatedFields});
  };

  const dropForm = event => {
    event.preventDefault();
    updateNewFormFields(newForm.fieldsInitialValues);
  };

  const formIsEmpty = newFormFields.fields.length < 1 ? true : false;

  return(
    <main>
      <Formik initialValues={ newFormFields } onSubmit={ formService.save }>
       <Form>
        <div>
          <h1>{ newFormFields.title }</h1>
        </div>
        <div>
          { newFormFields.fields.length !== 0 && newFormFields.fields.map((field) => (
            <div key={ field.uniqueId }>
              <div>
                <h5>Название поля: { field.name }</h5>
                <h5>Описание поля: { field.description }</h5>
                <h5>Тип поля: { field.type }</h5>
              </div>
              <div>
                <h5 onClick={e => deleteField(e, field.uniqueId)}>
                  Удалить
                </h5>
              </div>
            </div>
          ))}
        </div>
        { editorIsVisible && (
            <div>
              <input
                placeholder="Название поля"
                value={ name }
                onChange={e => setName(e.target.value)}
              />
              <input
                placeholder="Описание поля"
                value={ description }
                onChange={e => setDescription(e.target.value)}
              />
              <select value={ type } onChange={e => setType(e.target.value)}>
                <option value="text">Text</option>
                <option value="textarea">TextArea</option>
                <option value="select">Select</option>
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
        <button type="submit" disabled={ formIsEmpty }>
          Сохранить форму
        </button>
        <button onClick={e => dropForm(e)} disabled={ formIsEmpty }>
          Сбросить форму
        </button>
       </Form>
     </Formik>
    </main>
  );
};

export { NewFormEditor };
