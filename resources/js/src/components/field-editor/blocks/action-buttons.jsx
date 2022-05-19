import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const ActionButtons = ({ abortCallback }) => (
  <>
    <Button
      size="medium"
      variant="contained"
      color="success"
      type="submit"
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
  abortCallback: PropTypes.func.isRequired,
};

export { ActionButtons };
