import React from 'react';
import { Popper, Box } from '@mui/material';
import {
  UilPlusCircle, UilTrashAlt, UilCopy, UilEditAlt,
} from '@iconscout/react-unicons';

import { styles } from './menu.styles';

const NewFormMenu = ({ anchorEl }) => (
  <Popper placement="right-start" anchorEl={ anchorEl } open={ anchorEl !== null }>
    <Box sx={ styles.menu }>
      <UilPlusCircle
        onClick={() => alert('Добавление')}
        color="#545454"
      />
      <UilEditAlt
        onClick={() => alert('Редактирование')}
        color="#545454"
      />
      <UilCopy
        onClick={() => alert('Копирование')}
        color="#545454"
      /> 
      <UilTrashAlt
        onClick={() => alert('Удаление')}
        color="#545454"
      />
    </Box>
  </Popper>
);

export { NewFormMenu };
