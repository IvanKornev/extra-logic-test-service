import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { LinkedListConverter } from '@lib/converters';
import { form } from '@global-states';

import { NewFieldEditor } from '@components/features/editor';
import {
  NewFormFields,
  NewFormMenu,
  NewFormEditingField,
} from '@components/features/new-form';
import { styles } from './new-form.styles';

const NewFormPage = observer(() => {
  const [editorIsVisible, setEditorVisibility] = useState(false);
  return (
    <section style={styles.page}>
      <NewFormFields
        selectedFieldComponent={<NewFormEditingField />}
        menuComponent={
          <NewFormMenu
            showEditorAction={setEditorVisibility}
            onlyAddOption={!form.selectedField && true}
          />
        }
        fields={LinkedListConverter.toArray(form.fieldsList)}
      />
      <NewFieldEditor
        abortCallback={() => setEditorVisibility(false)}
        wasOpened={editorIsVisible}
      />
    </section>
  );
});

export { NewFormPage };
