import React, { useState } from 'react';

import { useNewForm } from '@hooks';
import { LinkedListConverter } from '@lib/converters';

import { NewFieldEditor } from '@components/features/editor';
import {
  NewFormFields,
  NewFormMenu,
  NewFormEditingField,
} from '@components/features/new-form';

import { styles } from './new-form.styles';
import { observer } from 'mobx-react-lite';
import { form } from '@global-states';

const NewFormPage = observer(() => {
  const { formik } = useNewForm();
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
        formikInstance={formik}
      />
      <NewFieldEditor
        abortCallback={() => setEditorVisibility(false)}
        wasOpened={editorIsVisible}
      />
    </section>
  );
});

export { NewFormPage };
