import React from 'react';

import styles from './all-forms.module.scss';
import {
  AllFormsTemplates,
  AllFormsList,
} from '@components/features/all-forms';

export const AllFormsPage = () => {
  return (
    <section className={styles['all-forms__section']}>
      <div>
        <AllFormsTemplates />
        <AllFormsList />
      </div>
    </section>
  );
};
