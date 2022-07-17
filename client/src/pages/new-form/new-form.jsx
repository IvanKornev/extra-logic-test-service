import React, { useRef } from 'react';

import { observer } from 'mobx-react-lite';
import { formState } from '@global-states';

import styles from './new-form.module.scss';
import { CurrentFormLayout } from '@layouts';
import { NewFieldCreator } from '@components/features/creators';
import {
  NewFormFields,
  NewFormMenu,
  NewFormEditingField,
  NewFormTitleField,
} from '@components/features/new-form';

const NewFormPage = observer(() => {
  formState.fieldsCounter;
  const creatorRef = useRef();
  return (
    <CurrentFormLayout>
      <section className={styles['page']}>
        <div className={styles['page__wrapper']}>
          <div className={styles['page__fields']}>
            <NewFormTitleField />
            <NewFormFields selectedFieldComponent={<NewFormEditingField />} />
          </div>
          <div className={styles['page__menu']}>
            <NewFormMenu
              ref={creatorRef}
              onlyAddOption={!formState.selectedField ? true : false}
            />
          </div>
        </div>
        <NewFieldCreator ref={creatorRef} />
      </section>
    </CurrentFormLayout>
  );
});

export { NewFormPage };
