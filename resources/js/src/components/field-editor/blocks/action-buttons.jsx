import React from 'react';
import { Button } from '@mui/material';

const ActionButtons = () => (
  <>
    <Button size="medium" variant="contained" color="success" type="submit">
      Сохранить поле
    </Button>
    <Button size="medium" variant="contained" color="error">
      Отмена
    </Button> 
  </>
);

export { ActionButtons };
