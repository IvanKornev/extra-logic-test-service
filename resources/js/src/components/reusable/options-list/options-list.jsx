import React, { useState, useId, useRef } from 'react';
import PropTypes from 'prop-types';

import { selectOptionReducer } from '@reducers';
import { useFieldsHandler } from '@hooks';
import { formsStructure } from '@constants';
import { selectOptionIsEmpty } from '@domains';

import { NewOptionCreator } from '@components/features/creators';
import {
  List,
  Typography,
  ListItem,
  ListItemText,
  Stack,
  Button,
  TextField,
} from '@mui/material';
import {
  UilPen,
  UilTrashAlt,
  UilTimesCircle,
  UilCheckCircle,
} from '@iconscout/react-unicons';

import styles from './options-list.module.scss';

export const OptionsList = (props) => {
  const creatorRef = useRef();
  const [editingField, selectEditingField] = useState(null);

  const { handlers, list, scrollbarColor } = props;
  const scrollbarStyles = styles[`scrollbar_${scrollbarColor}`];
  return (
    <Stack id='options-list' direction='column' justifyContent='center'>
      {list.length !== 0 && (
        <List className={`${styles['list']} ${scrollbarStyles}`}>
          <Typography>Опции селектора: </Typography>
          {list.map((option, index) => {
            const { id } = option;
            const Option =
              editingField?.id === id ? EditingOption : DefaultOption;
            return (
              <Option
                option={option}
                handlers={handlers}
                abortCallback={() => selectEditingField(null)}
                selectCallback={() => selectEditingField(option)}
                number={index + 1}
                key={id}
              />
            );
          })}
        </List>
      )}
      {handlers && (
        <>
          <Button
            id='options-list__button_add'
            size='small'
            variant='text'
            color='secondary'
            onClick={() => creatorRef.current.show()}>
            Добавить опцию селектора
          </Button>
          <NewOptionCreator ref={creatorRef} optionsHandlers={handlers} />
        </>
      )}
    </Stack>
  );
};

const DefaultOption = ({ option, number, handlers, selectCallback }) => {
  const listClasses = [
    'options-list__option_default',
    styles['option_default'],
  ];
  const itemText = `${number}) ${option.title}`;
  return (
    <ListItem className={listClasses.join(' ')}>
      <ListItemText primary={itemText} />
      {handlers && (
        <Stack className='option__actions' direction='row' spacing={1}>
          <UilPen
            className='option__actions_edit'
            size={18}
            onClick={selectCallback}
          />
          <UilTrashAlt
            className='option__actions_remove'
            size={18}
            onClick={() => handlers.remove(option.id)}
          />
        </Stack>
      )}
    </ListItem>
  );
};

const EditingOption = ({ option, abortCallback, handlers }) => {
  const { fields, handle } = useFieldsHandler(selectOptionReducer, option);
  const circleColor = selectOptionIsEmpty(fields) ? '#C5C5C5' : '#1EE676';
  const editField = () => {
    if (!selectOptionIsEmpty(fields)) {
      handlers.edit(fields);
      abortCallback();
    }
  };
  return (
    <div className={styles['option__wrapper_editing']}>
      <div className={styles['option__fields_editing']}>
        {formsStructure.option.map((field) => (
          <TextField
            id={`option__field_${field.name}`}
            placeholder={field.label}
            key={useId()}
            variant='standard'
            value={fields[field.name]}
            onChange={(e) => handle(e, field.name)}
            className={styles[`option__${field.name}_editing`]}
          />
        ))}
      </div>
      <div className={styles['option__buttons_editing']}>
        <UilCheckCircle
          className='option__actions_confirm-changes'
          color={circleColor}
          size={28}
          onClick={editField}
        />
        <UilTimesCircle
          className='option__actions_discard-changes'
          color='#F12323'
          size={28}
          onClick={abortCallback}
        />
      </div>
    </div>
  );
};

OptionsList.propTypes = {
  scrollbarColor: PropTypes.oneOf(['blue', 'purple']).isRequired,
  list: PropTypes.array.isRequired,
  handlers: PropTypes.object,
};
