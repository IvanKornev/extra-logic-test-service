import React from 'react';
import PropTypes from 'prop-types';
import { Button, Stack } from '@mui/material';
import { OptionsList } from '@components/reusable';

const OptionsHandler = (props) => {
  const {
    options,
    editorComponent,
    editorWasOpened,
    openEditor,
    optionsHandlers,
  } = props;
  return (
    <Stack direction='column' justifyContent='center'>
      {options.length !== 0 && (
        <OptionsList list={options} handlers={optionsHandlers} />
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
  optionsHandlers: PropTypes.object,
};

export { OptionsHandler };
