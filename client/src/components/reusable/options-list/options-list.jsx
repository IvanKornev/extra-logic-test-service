import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useFormBuilder } from '@hooks';
import { getSelectOptionClasses } from '@entities';

import { OptionCreator } from '@components/features/creators';
import { UilPen, UilTrashAlt } from '@iconscout/react-unicons';
import {
  List,
  Typography,
  ListItem,
  ListItemText,
  Stack,
  Button,
} from '@mui/material';
import styles from './options-list.module.scss';

export const OptionsList = (props) => {
  const creatorRef = useRef();
  const { handlers, list, scrollbarColor } = props;
  const newOptionForm = useFormBuilder('new-option')(handlers, creatorRef);

  const scrollbarStyles = styles[`scrollbar_${scrollbarColor}`];
  const listClasses = `${styles['list']} ${scrollbarStyles}`;
  return (
    <Stack id='options-list' direction='column' justifyContent='center'>
      {list.length !== 0 && (
        <List className={listClasses}>
          <Typography>Опции селектора: </Typography>
          {list.map((value, index) => (
            <OptionsListItem
              value={value}
              handlers={handlers}
              number={index + 1}
              key={value.id}
            />
          ))}
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
          <OptionCreator
            title='Новая опция селектора'
            ref={creatorRef}
            formInstance={newOptionForm}
          />
        </>
      )}
    </Stack>
  );
};

const OptionsListItem = ({ value, number, handlers }) => {
  const creatorRef = useRef();
  const formParams = { handlers, creatorRef, value };
  const editingOptionForm = useFormBuilder('editing-option')(formParams);

  const itemRef = useRef();
  const removeItem = () => {
    const newClass = styles['list__option_removing'];
    itemRef.current.classList.add(newClass);
    setTimeout(() => handlers.remove(value.id), 200);
  };

  const listClasses = getSelectOptionClasses(styles);
  const itemText = `${number}) ${value.title}`;
  return (
    <ListItem ref={itemRef} className={listClasses.join(' ')}>
      <ListItemText primary={itemText} />
      {handlers && (
        <Stack className='option__actions' direction='row' spacing={1}>
          <UilPen
            onClick={() => creatorRef.current.show()}
            size={18}
            className='option__actions_edit'
          />
          <UilTrashAlt
            onClick={removeItem}
            size={18}
            className='option__actions_remove'
          />
        </Stack>
      )}
      <OptionCreator
        title='Редактировании опции'
        ref={creatorRef}
        formInstance={editingOptionForm}
      />
    </ListItem>
  );
};

OptionsList.propTypes = {
  scrollbarColor: PropTypes.oneOf(['blue', 'purple']).isRequired,
  list: PropTypes.array.isRequired,
  handlers: PropTypes.object,
};
