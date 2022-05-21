import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const ActionButtons = ({ abortCallback, disableCondition }) => (
  <>
    <Button
      size="medium"
      variant="contained"
      color="success"
      type="submit"
      disabled={ disableCondition }
    >Сохранить поле</Button>
    <Button
      size="medium"
      variant="contained"
      color="error"
      onClick={ abortCallback }
    >Отмена</Button> 
  </>
);

ActionButtons.defaultProps = {
  disableCondition: false,
};

ActionButtons.propTypes = {
  disableCondition: PropTypes.bool,
  abortCallback: PropTypes.func.isRequired,
};

export { ActionButtons };
