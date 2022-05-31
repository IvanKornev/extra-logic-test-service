import React from 'react';
import PropTypes from 'prop-types';
import generateId from 'uniqid';

import { List, Typography, ListItem, ListItemText, Stack } from '@mui/material';
import { select } from '@domains';

import { styles } from './options-list.styles';

export const OptionsList = ({ actions, list }) => {
  const optionActions = select.getOptionActions(actions);
  return (
    <List sx={styles.list}>
      <Typography>Опции селектора: </Typography>
      {list.map((option, index) => {
        const texts = select.getOptionTexts(option, index + 1);
        return (
          <ListItem key={generateId()} sx={styles.item}>
            <ListItemText primary={texts.primary} secondary={texts.secondary} />
            <Stack direction='row' spacing={1}>
              {optionActions && optionActions.map((option) => {
                const { iconComponent, performAction } = option;
                const CurrentComponent = iconComponent;
                return (
                  <CurrentComponent
                    size={18}
                    onClick={() => performAction(option.id, list)}
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
  list: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    edit: PropTypes.func,
    remove: PropTypes.func,
  }),
};
