import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { NewFieldEditor } from '@components/features/editor';
import {
  NewFormFields,
  NewFormMenu,
  NewFormEditingField,
  NewFormTitleField,
} from '@components/features/new-form';
import { styles } from './new-form.styles';

const NewFormPage = observer(() => {
  const [editorIsVisible, setEditorVisibility] = useState(false);
  return (
    <section style={styles.page}>
      <div style={styles.wrapper}>
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
