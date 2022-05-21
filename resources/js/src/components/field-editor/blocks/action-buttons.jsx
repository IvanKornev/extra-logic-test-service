import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const ActionButtons = ({ abortCallback, optionsCount, fieldType }) => (
  <>
    <Button
      size="medium"
      variant="contained"
      color="success"
      type="submit"
      disabled={ fieldType === 'select' && optionsCount === 0 }
    >Сохранить поле</Button>
    <Button
      size="medium"
      variant="contained"
      color="error"
      onClick={ abortCallback }
    >Отмена</Button> 
  </>
);

ActionButtons.propTypes = {
  optionsCount: PropTypes.number.isRequired,
  fieldType: PropTypes.string.isRequired,
  abortCallback: PropTypes.func.isRequired,
};

export { ActionButtons };
