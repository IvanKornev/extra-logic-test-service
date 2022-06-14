import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import styles from './new-form.module.scss';
import { NewFieldEditor } from '@components/features/editor';
import {
  NewFormFields,
  NewFormMenu,
  NewFormEditingField,
  NewFormTitleField,
} from '@components/features/new-form';

const NewFormPage = observer(() => {
  const [editorIsVisible, setEditorVisibility] = useState(false);
  return (
    <section className={styles['page']}>
      <div className={styles['page__wrapper']}>
        <NewFormTitleField
          menuComponent={
            <NewFormMenu
              showEditorAction={setEditorVisibility}
              onlyAddOption={true}
            />
          }
        />
        <NewFormFields
          selectedFieldComponent={<NewFormEditingField />}
          menuComponent={<NewFormMenu showEditorAction={setEditorVisibility} />}
        />
      </div>
      <NewFieldEditor
        abortCallback={() => setEditorVisibility(false)}
        wasOpened={editorIsVisible}
      />
    </section>
  );
});

export { NewFormPage };
