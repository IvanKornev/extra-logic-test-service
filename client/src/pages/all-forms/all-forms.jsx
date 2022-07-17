import React from 'react';
import styles from './all-forms.module.scss';

import { AllFormsLayout } from '@layouts';
import {
  AllFormsTemplates,
  AllFormsList,
} from '@components/features/all-forms';

export const AllFormsPage = () => {
  return (
    <AllFormsLayout>
      <section className={styles['all-forms__section']}>
        <div>
          <AllFormsTemplates />
          <AllFormsList />
        </div>
      </section>
    </AllFormsLayout>
  );
};
