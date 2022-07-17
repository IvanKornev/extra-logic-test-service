import React from 'react';
import { useNavigate } from 'react-router-dom';

import { initialValues } from '@constants/initial-values';
import { useQuery } from '@hooks';
import { getAllFormTemplates } from '@api';

import { Typography, Skeleton } from '@mui/material';
import { FormTemplatePreview } from '@components/reusable';
import styles from './templates.modules.scss';

export const AllFormsTemplates = () => {
  const queryResults = useQuery(getAllFormTemplates());
  const { templatesList } = queryResults;

  const navigate = useNavigate();
  const emptyBlankClickHandler = () => navigate('/form/new');

  const { formTemplates } = initialValues;
  const skeletonCardsId = Array.from(Array(5).keys());
  return (
    <div className={styles['templates']}>
      <div className={styles['templates__wrapper']}>
        <Typography variant='h6' component='h1'>
          Создать форму
        </Typography>
        <div className={styles['templates__cards']}>
          {templatesList.length === 0 &&
            skeletonCardsId.map((id) => (
              <Skeleton
                height={100}
                width={150}
                key={id}
                variant='rectangular'
                animation='wave'
              />
            ))}
          {templatesList.length !== 0 && (
            <>
              <FormTemplatePreview
                onClick={emptyBlankClickHandler}
                template={formTemplates.emptyBlank}
              />
              {templatesList.map((template) => {
                const clickHandler = () => {
                  navigate(`/form/${template.id}`);
                };
                return (
                  <FormTemplatePreview
                    onClick={clickHandler}
                    template={template}
                    key={template.id}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
