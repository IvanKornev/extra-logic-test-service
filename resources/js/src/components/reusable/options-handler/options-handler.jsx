import React from 'react';
import PropTypes from 'prop-types';
import { Button, Stack } from '@mui/material';

import { selectOptions } from '@domains';
import { OptionsList } from '@components/reusable';

const OptionsHandler = ({
  options,
  editorComponent,
  editorWasOpened,
  openEditor,
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
      <Button
        size='small'
        variant='text'
        color='primary'
        onClick={() => openEditor(true)}>
        Добавить опцию селектора
      </Button>
      {editorWasOpened && editorComponent}
    </Stack>
  );
};

OptionsHandler.propTypes = {
  options: PropTypes.array.isRequired,
  editorComponent: PropTypes.element.isRequired,
  openEditor: PropTypes.func.isRequired,
  editorWasOpened: PropTypes.bool.isRequired,
};

export { OptionsHandler };
