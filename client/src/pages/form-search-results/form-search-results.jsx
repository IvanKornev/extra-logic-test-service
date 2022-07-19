import React, { useId } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@hooks';
import { findForm } from '@api';
import { AllFormsLayout } from '@layouts';

import styles from './form-search-results.module.scss';
import { Typography } from '@mui/material';
import { FormCard } from '@components/reusable';
import { ToBackButton, CreateFormButton } from '@components/reusable/buttons';

export const FormSearchResultsPage = () => {
  const { query } = useParams();
  const { searchedForms } = useQuery(findForm(query), [query]);
  return (
    <AllFormsLayout>
      <div className={styles['results']}>
        <div className={styles['results__wrapper']}>
          <div className={styles['results__top-panel']}>
            <Typography variant='h6' component='h1'>
              Результаты поиска
            </Typography>
            <ToBackButton />
          </div>
          {searchedForms.length !== 0 && (
            <SearchResults searchedForms={searchedForms} />
          )}
          {searchedForms.length === 0 && <SearchResultsIsEmpty query={query} />}
        </div>
      </div>
    </AllFormsLayout>
  );
};

const SearchResults = ({ searchedForms }) => (
  <div className={styles['results__cards']}>
    {searchedForms.map((form) => (
      <FormCard key={useId} form={form} />
    ))}
  </div>
);

const SearchResultsIsEmpty = ({ query }) => (
  <>
    <div className={styles['results__info']}>
      <Typography variant='h6' component='h1'>
        Форм по запросу {`"${query}"`} не найдено
      </Typography>
      <Typography>Нажмите на + снизу, чтобы создать новую форму</Typography>
    </div>
    <CreateFormButton />
  </>
);
