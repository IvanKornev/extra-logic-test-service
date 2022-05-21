import React from 'react';
import PropTypes from 'prop-types';
import generateId from 'uniqid';

import {
  UilTrashAlt, UilPen,
} from '@iconscout/react-unicons';
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
              <Stack direction="row" spacing={ 1 }>
                <UilPen
                  size={ 18 }
                  onClick={() => setOptions(select.editOption(id, options))}
                />
                <UilTrashAlt
                  size={ 18 }
                  onClick={() => setOptions(select.deleteOption(id, options))}
                />
              </Stack>
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
