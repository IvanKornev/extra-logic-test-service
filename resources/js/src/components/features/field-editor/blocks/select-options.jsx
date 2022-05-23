import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Stack } from '@mui/material'

import { select } from '@domains'
import { OptionsList, NewOption } from '.'

const SelectOptions = (props) => {
  const { options, setOptions } = props
  const [newOptionIsAdding, addNewOption] = useState(false)

  const editWrapper = (id, options) =>
    setOptions(select.editOption(id, options))
  const deleteWrapper = (id, options) =>
    setOptions(select.deleteOption(id, options))

  return (
    <Stack direction='column' justifyContent='center'>
      {options.length !== 0 && (
        <OptionsList
          options={options}
          editCallback={editWrapper}
          deleteCallback={deleteWrapper}
        />
      )}
      <Button
        size='small'
        variant='text'
        color='primary'
        onClick={() => addNewOption(true)}
      >
        Добавить опцию селектора
      </Button>
      {newOptionIsAdding && (
        <NewOption
          abortCallback={() => addNewOption(false)}
          isVisible={newOptionIsAdding}
          setOptions={setOptions}
        />
      )}
    </Stack>
  )
}

SelectOptions.propTypes = {
  options: PropTypes.array.isRequired,
  setOptions: PropTypes.func.isRequired,
}

export { SelectOptions }
