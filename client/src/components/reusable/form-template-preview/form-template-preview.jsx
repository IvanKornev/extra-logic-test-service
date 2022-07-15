import React from 'react';
import PropTypes from 'prop-types';
import { generateLinearGradient, generateAbbreviation } from '@lib/generators';

import { Typography } from '@mui/material';
import { UilPlus } from '@iconscout/react-unicons';
import styles from './form-template-preview.module.scss';

export const FormTemplatePreview = (props) => {
  const { template, onClick } = props;
  const { title, isCustomTemplate } = template;
  const imageAbbrevation = generateAbbreviation(title);
  return (
    <article onClick={onClick}>
      <div className={styles['template-preview__wrapper']}>
        <div
          className={styles['template-preview__image']}
          style={{ background: generateLinearGradient() }}>
          <Typography variant='h6' component='h2'>
            {isCustomTemplate ? <UilPlus /> : imageAbbrevation}
          </Typography>
        </div>
        <div className={styles['template-preview__title']}>
          <Typography variant='h6' component='h2'>
            {title}
          </Typography>
        </div>
      </div>
    </article>
  );
};

FormTemplatePreview.defaultProps = {
  isCustomTemplate: false,
};

FormTemplatePreview.propTypes = {
  onClick: PropTypes.func,
  template: PropTypes.shape({
    title: PropTypes.string.isRequired,
    isCustomTemplate: PropTypes.bool,
  }),
};
