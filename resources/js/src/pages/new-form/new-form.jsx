import React, { useRef } from 'react';

import { observer } from 'mobx-react-lite';
import { form } from '@global-states';

import styles from './new-form.module.scss';
import { NewFieldCreator } from '@components/features/creators';
import {
  NewFormFields,
  NewFormMenu,
  NewFormEditingField,
  NewFormTitleField,
} from '@components/features/new-form';

const NewFormPage = observer(() => {
  form.fieldsCounter;
  const creatorRef = useRef();
  return (
    <section className={styles['page']}>
      <div className={styles['page__wrapper']}>
        <div className={styles['page__fields']}>
          <NewFormTitleField />
          <NewFormFields selectedFieldComponent={<NewFormEditingField />} />
        </div>
        <div className={styles['page__menu']}>
          <NewFormMenu
            ref={creatorRef}
            onlyAddOption={!form.selectedField ? true : false}
          />
        </div>
      </div>
      <NewFieldCreator ref={creatorRef} />
    </section>
  );
});

export { NewFormPage };
