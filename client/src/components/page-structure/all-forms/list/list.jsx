import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { userState } from '@global-states';

import { getAllForms } from '@api';
import { useQuery, usePageNavigator } from '@hooks';

import { FormCard } from '@components/reusable';
import { Typography, Skeleton } from '@mui/material';
import { UilLockAlt } from '@iconscout/react-unicons';
import styles from './list.module.scss';

export const AllFormsList = observer(({ userId }) => {
  return (
    <div className={styles['all-forms__list']}>
      <div className={styles['list__wrapper']}>
        <div className={styles['list__panel']}>
          <Typography variant='h6' component='h1'>
            Формы
          </Typography>
        </div>
        {!userState.isAuthorized && <UnauthorizedUserBanner />}
        {userState.isAuthorized && <AuthorizedUserList userId={userId} />}
      </div>
    </div>
  );
});

const UnauthorizedUserBanner = () => (
  <div className={styles['banner']}>
    <div className={styles['banner__wrapper']}>
      <UilLockAlt size={50} />
      <Typography>
        Просмотр сохраненных форм доступен лишь авторизованным пользователям
      </Typography>
    </div>
  </div>
);

const AuthorizedUserList = ({ userId }) => {
  const queryResults = useQuery(getAllForms(userId), [userId]);
  const navigate = useNavigate();

  const { formsList } = queryResults;
  const skeletonCardsId = Array.from(Array(10).keys());
  return (
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
      {formsList.map((form) => {
        const clickHandler = () => {
          const { id } = form;
          usePageNavigator(navigate, 'saving-form')(id);
        };
        return <FormCard onClick={clickHandler} key={form.id} form={form} />;
      })}
    </div>
  );
};

AllFormsList.propTypes = {
  userId: PropTypes.number,
};
