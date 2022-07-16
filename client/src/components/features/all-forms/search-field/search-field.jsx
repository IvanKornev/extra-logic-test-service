import React, { useState } from 'react';
import { findForm } from '@api';

import { TextField, InputAdornment } from '@mui/material';
import { UilSearch, UilTimes } from '@iconscout/react-unicons';
import styles from './search-field.module.scss';

export const AllFormsSearchField = () => {
  const [query, setQuery] = useState('');
  const inputProps = {
    startAdornment: <ConfirmQueryIcon query={query} />,
    endAdornment: <AbortQueryIcon query={query} queryAction={setQuery} />,
  };
  const keyDownHandler = (event) => event.key === 'Enter' && findForm(query);
  return (
    <TextField
      onKeyDown={keyDownHandler}
      onChange={(e) => setQuery(e.target.value)}
      value={query}
      placeholder='Найти форму'
      color='secondary'
      InputProps={inputProps}
    />
  );
};

const ConfirmQueryIcon = (props) => {
  const { query } = props;
  const clickHandler = () => {
    query.length !== 0 && findForm(query);
  };
  return (
    <InputAdornment position='start'>
      <div onClick={clickHandler} className={styles['icon__wrapper']}>
        <UilSearch size={24} />
      </div>
    </InputAdornment>
  );
};

const AbortQueryIcon = (props) => {
  const { queryAction, query } = props;
  if (query.length === 0) {
    return;
  }
  const clickHandler = () => queryAction('');
  return (
    <InputAdornment position='end'>
      <div onClick={clickHandler} className={styles['icon__wrapper']}>
        <UilTimes size={24} />
      </div>
    </InputAdornment>
  );
};
