import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { v4 as generateUuid } from 'uuid'; 

import { newForm } from './src/domains';
import { formService } from './src/services';

const NewFormEditor = () => {
  let [fields, updateFields] = useState([]);
  let [editorIsVisible, setEditorVisibility] = useState(false);
  let [name, setName] = useState('');
  let [description, setDescription] = useState('');
  let [type, setType] = useState('text');

  const saveField = event => {
    event.preventDefault();
    const savingField = {
      uniqueId: generateUuid(),
      name: name || 'Имя по умолчанию',
      description: description || 'Описание по умолчанию',
      type, 
    };

    updateFields(prev => [...prev, savingField]);
    console.log(fields);
    setEditorVisibility(false);
  };

  const deleteField = (event, uniqueId) => {
    event.preventDefault();
    const updatedFields = fields.filter(field => field.uniqueId !== uniqueId);
    updateFields(updatedFields);
  };

  const dropForm = event => {
    event.preventDefault();
    updateFields([]);
  };

  const formIsEmpty = fields.length < 1 ? true : false;

  return(
    <main>
        <div>
          <h1>Новая форма</h1>
        </div>
        <div>
          { fields.length !== 0 && fields.map((field) => (
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
                <button
                  type="button"
                  onClick={() => setEditorVisibility(false)}
                >Отмена</button>
              </div>
            </div>
        )}
        <button
          type="button"
          onClick={() => setEditorVisibility(true)}
        >Добавить поле</button>
        <button onClick={() => formService.save(fields)} disabled={ formIsEmpty }>
          Сохранить форму
        </button>
        <button onClick={e => dropForm(e)} disabled={ formIsEmpty }>
          Сбросить форму
        </button>
    </main>
  );
};

export { NewFormEditor };
