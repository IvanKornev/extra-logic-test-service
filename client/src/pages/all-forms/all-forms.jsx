import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { formState } from '@global-states';

import styles from './all-forms.module.scss';
import { AllFormsLayout } from '@layouts';
import {
  AllFormsTemplates,
  AllFormsList,
} from '@components/page-structure/all-forms';

export const AllFormsPage = observer(() => {
  const location = useLocation();
  useEffect(() => formState.reset(), [location]);
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
});
