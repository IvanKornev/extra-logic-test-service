import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAllFormTemplates } from '@api';
import { initialValues } from '@constants/initial-values';

import { Typography, Skeleton } from '@mui/material';
import { FormTemplatePreview } from '@components/reusable';
import styles from './templates.modules.scss';

export const AllFormsTemplates = () => {
  const [templates, setTemplates] = useState([]);
  useEffect(() => {
    const getTemplates = async () => {
      const result = await getAllFormTemplates();
      setTemplates(result);
    };
    getTemplates();
  }, []);

  const navigate = useNavigate();
  const clickHandler = () => {
    navigate('/form/new');
  };

  const { formTemplates } = initialValues;
  const skeletonCardsId = Array.from(Array(5).keys());
  return (
    <div>
      <div className={styles['templates__wrapper']}>
        <Typography variant='h6' component='h1'>
          Создать форму
        </Typography>
        <div className={styles['templates__cards']}>
          {templates.length === 0 &&
            skeletonCardsId.map((id) => (
              <Skeleton
                height={100}
                width={150}
                key={id}
                variant='rectangular'
                animation='wave'
              />
            ))}
          {templates.length !== 0 && (
            <>
              <FormTemplatePreview
                onClick={clickHandler}
                template={formTemplates.blank}
              />
              {templates.map((template) => (
                <FormTemplatePreview template={template} key={template.id} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
