import React from 'react';
import PropTypes from 'prop-types';
import generateId from 'uniqid';

import { UilTrashAlt, UilPen } from '@iconscout/react-unicons'; 
import {
  List, Typography, ListItem, ListItemText, Stack,
} from '@mui/material';

import { select } from '../../../domains';
import { styles } from '../field-editor.styles';

export const OptionsList = props => {
  const { editCallback, deleteCallback, options } = props;
  const icons = [
    { component: UilPen, performAction: editCallback },
    { component: UilTrashAlt, performAction: deleteCallback },
  ];
  return(
    <List sx={ styles.optionsList }>
      <Typography>Опции селектора: </Typography>
        { options.map((option, index) => {
          const texts = select.getOptionTexts(option, index + 1);
          return(
            <ListItem key={ generateId() } sx={ styles.optionItem }>
              <ListItemText primary={ texts.primary } secondary={ texts.secondary } />
              <Stack direction="row" spacing={ 1 }>
                { icons.map((icon) => {
                  const { component, performAction } = icon;
                  const CurrentComponent = component;
                  return(
                    <CurrentComponent
                      size={ 18 }
                      onClick={() => (
                        performAction(option.id, options)
                      )}
                    />
                  );
                })}
              </Stack>
            </ListItem>
          );
        })}
    </List>
  );
};

OptionsList.propTypes = {
  options: PropTypes.array.isRequired,
  editCallback: PropTypes.func.isRequired,
  deleteCallback: PropTypes.func.isRequired,
};
