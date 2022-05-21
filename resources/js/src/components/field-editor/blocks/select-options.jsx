import React from 'react';
import PropTypes from 'prop-types';
import generateId from 'uniqid';
import {
  Button, Stack, ListItem, List, ListItemText, Typography,
} from '@mui/material'; 

import { select } from '../../../domains';
import { styles } from '../field-editor.styles';

const SelectOptions = props => {
  const { options, setOptions } = props;
  return(
    <Stack direction="column" justifyContent="center">
      { options.length !== 0 && (
        <List sx={ styles.optionsList }>
          <Typography>Опции селектора: </Typography>
          { options.map(({ id, title, value }, index) => (
            <ListItem key={ generateId() } sx={ styles.optionItem }>
              <ListItemText
                divider={ true }
                primary={ `${ index + 1 }) Наименование: ${ title }` }
                secondary={ `Значение: ${ value }` } 
              />
              <Typography
                onClick={() => setOptions(select.deleteOption(id, options))}
              >Удалить</Typography>
              <Typography
                onClick={() => setOptions(select.editOption(id, options))}
              >Изменить</Typography>
            </ListItem>
          ))}
        </List>
      )}
      <Button
        size="small"
        variant="text"
        color="primary"
        onClick={() => setOptions(prev => [...prev, select.addOption()])}
      >Добавить опцию селектора</Button>
    </Stack>
  );
};

SelectOptions.propTypes = {
  options: PropTypes.array.isRequired,
  setOptions: PropTypes.func.isRequired,
};

export { SelectOptions };
