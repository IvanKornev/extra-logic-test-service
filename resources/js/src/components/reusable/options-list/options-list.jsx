import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { useFormBuilder } from '@hooks';
import { getSelectOptionClasses } from '@domains';

import { OptionCreator } from '@components/features/creators';
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
  const [editingField, selectEditingField] = useState(null);
  const { handlers, list, scrollbarColor } = props;
  const newOptionForm = useFormBuilder('new-option')(handlers, creatorRef);
  const scrollbarStyles = styles[`scrollbar_${scrollbarColor}`];
  return (
    <Stack id='options-list' direction='column' justifyContent='center'>
      {list.length !== 0 && (
        <List className={`${styles['list']} ${scrollbarStyles}`}>
          <Typography>Опции селектора: </Typography>
          {list.map((option, index) => (
            <Option
              option={option}
              handlers={handlers}
              number={index + 1}
              key={option.id}
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

const Option = ({ option, number, handlers }) => {
  const creatorRef = useRef();
  const editingOptionForm = useFormBuilder('editing-option')(
    handlers,
    creatorRef,
    option,
  );

  const listClasses = getSelectOptionClasses(styles);
  const itemText = `${number}) ${option.title}`;
  return (
    <ListItem className={listClasses.join(' ')}>
      <ListItemText primary={itemText} />
      {handlers && (
        <Stack className='option__actions' direction='row' spacing={1}>
          <p onClick={() => creatorRef.current.show()}>Править</p>
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
