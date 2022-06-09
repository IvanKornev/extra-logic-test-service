import React, { useState } from 'react';
import PropTypes from 'prop-types';
import generateId from 'uniqid';

import { List, Typography, ListItem, ListItemText, Stack, TextField, Button } from '@mui/material';
import { UilPen, UilTrashAlt } from '@iconscout/react-unicons';

import { selectOptions } from '@domains';

import { styles } from './options-list.styles';

export const OptionsList = ({ handlers, list }) => {
  const [editingField, selectEditingField] = useState(null);
  return (
    <List sx={styles.list}>
      <Typography>Опции селектора: </Typography>
      {list.map((option, index) => {
        const texts = selectOptions.getTexts(option, index + 1);
        const { id, title, value } = option;
      
        if (editingField?.id === id) {
          return (
            <ListItem key={generateId()} sx={styles.editingOption}>
              <div>
                <TextField placeholder={title} />
                <TextField placeholder={value} />
              </div>
              <div>
                <Button
                  variant='standard'
                  onClick={() => handlers.edit(option)}>
                  Сохранить
                </Button>
                <Button
                  variant='standard'
                  onClick={() => setEditorVisibility(false)}>
                  Оставить без изменений
                </Button>
              </div>
            </ListItem>
          );
        }

        return (
          <ListItem key={generateId()} sx={styles.option}>
            <ListItemText primary={texts.primary} secondary={texts.secondary} />
            <Stack direction='row' spacing={1}>
              <UilPen size={18} onClick={() => selectEditingField(option)} />
              <UilTrashAlt size={18} onClick={() => handlers.remove(id)} />
            </Stack>
          </ListItem>
        );
      })}
    </List>
  );
};

OptionsList.propTypes = {
  list: PropTypes.array.isRequired,
  handlers: PropTypes.object,
};
