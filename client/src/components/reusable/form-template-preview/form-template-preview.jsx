import React from 'react';
import PropTypes from 'prop-types';
import { generateLinearGradient, generateAbbreviation } from '@lib/generators';

import { Typography } from '@mui/material';
import { UilPlus } from '@iconscout/react-unicons';
import styles from './form-template-preview.module.scss';

export const FormTemplatePreview = (props) => {
  const { template, onClick } = props;
  const { name, isCustomTemplate } = template;
  const imageAbbrevation = generateAbbreviation(name);
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
        <div className={styles['template-preview__name']}>
          <Typography variant='h6' component='h2'>
            {name}
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
  onClick: PropTypes.func.isRequired,
  template: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isCustomTemplate: PropTypes.bool,
  }),
};
