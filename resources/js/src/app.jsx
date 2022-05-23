import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'

import { Typography, Button } from '@mui/material'
import { formService } from '@services'
import { FieldEditor } from '@components/features'
import { app } from './styles';

const NewForm = () => {
  let [fields, updateFields] = useState([])
  let [editorIsVisible, setEditorVisibility] = useState(false)

  const deleteField = (event, uniqueId) => {
    event.preventDefault()
    const updatedFields = fields.filter((field) => field.uniqueId !== uniqueId)
    updateFields(updatedFields)
  }

  const dropForm = (event) => {
    event.preventDefault()
    updateFields([])
  }

  const formIsEmpty = fields.length < 1 ? true : false

  return (
    <main style={ app.page }>
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
              <div>
                <h5 onClick={(e) => deleteField(e, field.uniqueId)}>Удалить</h5>
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
        onClick={() => setEditorVisibility(true)}
      >
        Добавить поле
      </Button>
      <Button
        variant='contained'
        onClick={() => formService.save(fields)}
        disabled={formIsEmpty}
      >
        Сохранить форму
      </Button>
      <Button
        variant='contained'
        onClick={(e) => dropForm(e)}
        disabled={formIsEmpty}
      >
        Сбросить форму
      </Button>
    </main>
  )
}

const rootElem = document.getElementById('root')
if (rootElem) {
  const root = createRoot(rootElem)
  root.render(<NewForm />)
}

export { NewForm }
