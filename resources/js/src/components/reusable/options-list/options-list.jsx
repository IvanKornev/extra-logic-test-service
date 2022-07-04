import React, { useState, useId, useRef } from 'react';
import PropTypes from 'prop-types';

import { selectOptionReducer } from '@reducers';
import { useFieldsHandler } from '@hooks';
import { formsStructure, icons } from '@constants';
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
  const actions = {
    'edit': () => selectCallback(),
    'remove': () => handlers.remove(option.id),
  };
  const itemText = `${number}) ${option.title}`;
  return (
    <ListItem className={listClasses.join(' ')}>
      <ListItemText primary={itemText} />
      {handlers && (
        <Stack className='option__actions' direction='row' spacing={1}>
          {icons.optionsList.defaultOption.map((icon) => {
            const { action, component, size } = icon;
            const Icon = component;
            return (
              <Icon
                key={useId()}
                onClick={actions[action]}
                size={size}
                className={`options__actions_${action}`}
              />
            );
          })}
        </Stack>
      )}
    </ListItem>
  );
};

const EditingOption = ({ option, abortCallback, handlers }) => {
  const { fields, handle } = useFieldsHandler(selectOptionReducer, option);
  const editField = () => {
    if (!selectOptionIsEmpty(fields)) {
      handlers.edit(fields);
      abortCallback();
    }
  };
  const actions = {
    'confirm-changes': () => editField(),
    'discard-changes': () => abortCallback(),
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
        {icons.optionsList.editingOption.map((icon) => {
          const { action, component, size, color } = icon;
          const Icon = component;
          return (
            <Icon
              key={useId()}
              onClick={actions[action]}
              color={color}
              size={size}
              className={`options__actions_${action}`}
            />
          );
        })}
      </div>
    </div>
  );
};

OptionsList.propTypes = {
  scrollbarColor: PropTypes.oneOf(['blue', 'purple']).isRequired,
  list: PropTypes.array.isRequired,
  handlers: PropTypes.object,
};
