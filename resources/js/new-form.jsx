import React, { useState } from 'react'
import { Typography, Button } from '@mui/material'

import { formService } from './src/services'
import { FieldEditor } from './src/components'

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

  const styles = {
    // background: 'rgb(77,77,77)',
    //background: `radial-gradient(circle, rgba(77,77,77,1) 49%,
    //rgba(51,51,51,1) 74%, rgba(34,34,34,1) 100%)`,
    minHeight: '100vh',
    // color: '#fff',
  }

  return (
    <main style={styles}>
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

export { NewForm }
