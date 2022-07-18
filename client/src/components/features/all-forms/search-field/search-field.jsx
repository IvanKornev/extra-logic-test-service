import React from 'react';
import { observer } from 'mobx-react-lite';

import { useSearchFieldHandler } from '@hooks';
import { userState } from '@global-states';
import { initialValues } from '@constants';
import { getUserStatusKey } from '@entities';

import { TextField, InputAdornment } from '@mui/material';
import { UilSearch, UilTimes } from '@iconscout/react-unicons';
import styles from './search-field.module.scss';

export const AllFormsSearchField = observer(() => {
  const fieldHandler = useSearchFieldHandler();
  const inputProps = {
    startAdornment: <ConfirmQueryIcon fieldHandler={fieldHandler} />,
    endAdornment: <AbortQueryIcon fieldHandler={fieldHandler} />,
  };
  const statusKey = getUserStatusKey(userState);
  const fieldValues = initialValues.searchField[statusKey];
  return (
    <TextField
      disabled={fieldValues.isDisabled}
      onKeyDown={fieldHandler.events.keyDown}
      onChange={fieldHandler.query.set}
      value={fieldHandler.query.value}
      placeholder={fieldValues.placeholder}
      color='secondary'
      InputProps={inputProps}
    />
  );
});

const ConfirmQueryIcon = ({ fieldHandler }) => (
  <InputAdornment position='start'>
    <div
      onClick={fieldHandler.events.click}
      className={styles['icon__wrapper']}>
      <UilSearch size={24} />
    </div>
  </InputAdornment>
);

const AbortQueryIcon = ({ fieldHandler }) => {
  const isHidden = fieldHandler.query.isEmpty().toString();
  return (
    <InputAdornment position='end'>
      <div
        data-is-hidden={isHidden}
        onClick={fieldHandler.query.erase}
        className={styles['icon__wrapper']}>
        <UilTimes size={24} />
      </div>
    </InputAdornment>
  );
};
