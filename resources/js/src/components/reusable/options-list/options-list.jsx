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
        const { id } = option;
        const Option = (editingField?.id === id) ? EditingOption : DefaultOption;
        return (
          <Option
            option={option}
            handlers={handlers}
            confirmCallback={handlers.edit}
            abortCallback={() => selectEditingField(null)}
            selectCallback={() => selectEditingField(option)}
            number={index + 1}
            key={generateId()}
          />
        );
      })}
    </List>
  );
};

OptionsList.propTypes = {
  list: PropTypes.array.isRequired,
  handlers: PropTypes.object,
};

const DefaultOption = ({ option, number, handlers, selectCallback }) => {
  const texts = getSelectOptionTexts(option, number);
  return(
    <ListItem sx={styles.option}>
      <ListItemText primary={texts.primary} secondary={texts.secondary} />
      {handlers && (
        <Stack direction='row' spacing={1}>
          <UilPen size={18} onClick={selectCallback} />
          <UilTrashAlt size={18} onClick={() => handlers.remove(option.id)} />
        </Stack>
      )}
    </ListItem>
  );
};

const EditingOption = ({ option, abortCallback, confirmCallback }) => {
  const { fields, handle } = useFieldsHandler(selectOptionReducer, option);
  const circleColor = selectOptionIsEmpty(fields) ? '#C5C5C5' : '#1EE676';
  const editField = () => {
    if (!selectOptionIsEmpty(fields)) {
      confirmCallback(fields);
      abortCallback();
    }
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
        <UilTimesCircle color='#F12323' size={28} onClick={abortCallback} />
      </div>
    </div>
  );
};
