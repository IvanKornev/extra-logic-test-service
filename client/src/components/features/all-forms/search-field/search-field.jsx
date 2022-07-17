import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { usePageNavigator } from '@hooks';

import { TextField, InputAdornment } from '@mui/material';
import { UilSearch, UilTimes } from '@iconscout/react-unicons';
import styles from './search-field.module.scss';

export const AllFormsSearchField = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const keyDownHandler = (event) => {
    if (event.key === 'Enter') {
      usePageNavigator(navigate, 'form-search-results')(query);
    }
  };
  const inputProps = {
    startAdornment: <ConfirmQueryIcon query={query} />,
    endAdornment: <AbortQueryIcon query={query} queryAction={setQuery} />,
  };
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
  const navigate = useNavigate();
  const clickHandler = () => {
    if (query.length !== 0) {
      usePageNavigator(navigate, 'form-search-results')(query);
    }
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
