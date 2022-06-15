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
        <NewFormTitleField
          menuComponent={
            <NewFormMenu ref={creatorRef} onlyAddOption={true} />
          }
        />
        <NewFormFields
          selectedFieldComponent={<NewFormEditingField />}
          menuComponent={<NewFormMenu ref={creatorRef} />}
        />
      </div>
      <NewFieldCreator ref={creatorRef} />
    </section>
  );
});

export { NewFormPage };
