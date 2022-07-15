import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getAllForms } from '@api';
import { useQuery } from '@hooks';

import { FormCard } from '@components/reusable';
import { Typography, Skeleton } from '@mui/material';
import styles from './list.module.scss';

export const AllFormsList = ({ userId }) => {
  const queryResults = useQuery(getAllForms(userId), [userId]);
  console.log(queryResults);
  const { formsList } = queryResults;

  const skeletonCardsId = Array.from(Array(10).keys());
  return (
    <div className={styles['all-forms__list']}>
      <div className={styles['list__wrapper']}>
        <div className={styles['list__panel']}>
          <Typography variant='h6' component='h1'>
            Формы
          </Typography>
        </div>
        <div className={styles['list__cards']}>
          {!formsList.length &&
            skeletonCardsId.map((id) => (
              <Skeleton
                height={150}
                width={150}
                key={id}
                variant='rectangular'
                animation='wave'
              />
            ))}
          {formsList.map((form) => (
            <FormCard key={form.id} form={form} />
          ))}
        </div>
      </div>
    </div>
  );
};

AllFormsList.propTypes = {
  userId: PropTypes.number,
};
