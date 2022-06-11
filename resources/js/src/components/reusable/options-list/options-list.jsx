import React, { useState, useId } from 'react';
import PropTypes from 'prop-types';
import generateId from 'uniqid';

import { selectOptionReducer } from '@reducers';
import { useFieldsHandler } from '@hooks';
import { optionFields, optionLabels } from '@constants';
import { getSelectOptionTexts, selectOptionIsEmpty } from '@domains';

import {
  List,
  Typography,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from '@mui/material';
import {
  UilPen,
  UilTrashAlt,
  UilTimesCircle,
  UilCheckCircle,
} from '@iconscout/react-unicons';
import { styles } from './options-list.styles';

export const OptionsList = ({ handlers, list }) => {
  const [editingField, selectEditingField] = useState(null);
  return (
    <List sx={styles.list}>
      <Typography>Опции селектора: </Typography>
      {list.map((option, index) => {
        const texts = getSelectOptionTexts(option, index + 1);

        const { id } = option;
        if (editingField?.id === id) {
          return (
            <EditingOption
              callbacks={{
                confirm: handlers.edit,
                abort: () => selectEditingField(null),
              }}
              option={option}
              key={generateId()}
            />
          );
        }

        return (
          <ListItem key={generateId()} sx={styles.option}>
            <ListItemText primary={texts.primary} secondary={texts.secondary} />
            {handlers && (
              <Stack direction='row' spacing={1}>
                <UilPen size={18} onClick={() => selectEditingField(option)} />
                <UilTrashAlt size={18} onClick={() => handlers.remove(id)} />
              </Stack>
            )}
          </ListItem>
        );
      })}
    </List>
  );
};

const EditingOption = ({ option, callbacks }) => {
  const { abort, confirm } = callbacks;
  const { fields, handle } = useFieldsHandler(selectOptionReducer, option);

  const circleColor = selectOptionIsEmpty(fields) ? '#C5C5C5' : '#1EE676';
  const editField = () => {
    if (selectOptionIsEmpty(fields)) {
      return;
    }
    confirm(fields);
    abort();
  };
  return (
    <div style={styles.editingOption.wrapper}>
      <div style={styles.editingOption.fields}>
        {optionFields.map((fieldName) => (
          <TextField
            placeholder={optionLabels[fieldName]}
            key={useId()}
            variant='standard'
            value={fields[fieldName]}
            onChange={(e) => handle(e, fieldName)}
            sx={styles.editingOption[fieldName]}
          />
        ))}
      </div>
      <div style={styles.editingOption.buttons}>
        <UilCheckCircle color={circleColor} size={28} onClick={editField} />
        <UilTimesCircle color='#F12323' size={28} onClick={abort} />
      </div>
    </div>
  );
};

OptionsList.propTypes = {
  list: PropTypes.array.isRequired,
  handlers: PropTypes.object,
};
