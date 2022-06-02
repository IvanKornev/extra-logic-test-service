import React from 'react';
import PropTypes from 'prop-types';
import { Button, Stack } from '@mui/material';

import { selectOptions } from '@domains';
import { OptionsList } from '@components/reusable';

const OptionsHandler = ({
  options, setOptions, editorComponent, editorWasOpened, openEditor,
}) => {
  const editWrapper = (id, options) =>
    setOptions(selectOptions.edit(id, options));
  const deleteWrapper = (id, options) =>
    setOptions(selectOptions.remove(id, options));
  return (
    <Stack direction='column' justifyContent='center'>
      {options.length !== 0 && (
        <OptionsList
          list={options}
          actions={{
            remove: deleteWrapper,
            edit: editWrapper,
          }}
        />
      )}
      {setOptions && (
        <Button
          size='small'
          variant='text'
          color='primary'
          onClick={() => openEditor(true)}>
          Добавить опцию селектора
        </Button>
      )}
      {editorWasOpened && editorComponent}
    </Stack>
  );
};

OptionsHandler.propTypes = {
  options: PropTypes.array.isRequired,
  setOptions: PropTypes.func,
  editorComponent: PropTypes.element.isRequired,
  openEditor: PropTypes.func.isRequired,
  editorWasOpened: PropTypes.bool.isRequired,
};

export { OptionsHandler };
