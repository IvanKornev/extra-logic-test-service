import React, { useState } from 'react';
import PropTypes from 'prop-types';
import generateId from 'uniqid';

import {
  List,
  Typography,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Button,
} from '@mui/material';
import { UilPen, UilTrashAlt, UilTimesCircle, UilCheckCircle } from '@iconscout/react-unicons';

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
            <div key={generateId()} style={styles.editingOption.wrapper}>
              <div style={styles.editingOption.fields}>
                <TextField
                  variant='standard'
                  placeholder={title}
                />
                <TextField
                  variant='standard'
                  placeholder={value}
                  sx={styles.editingOption.value}
                />
              </div>
              <div style={styles.editingOption.buttons}>
                <UilCheckCircle
                  color='#1EE676'
                  size={28}
                  onClick={() => handlers.edit(option)}
                />
                <UilTimesCircle
                  color='#F12323'
                  size={28}
                  onClick={() => selectEditingField(null)}
                />
              </div>
            </div>
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
