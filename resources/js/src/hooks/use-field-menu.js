import { useState } from 'react';
import { form } from '@global-states';

export const useFieldMenu = () => {
  const [editorIsVisible, setEditorVisibility] = useState(false);
  const [currentField, setCurrentField] = useState(null);

  const actions = {
    add: () => setEditorVisibility(true),
    copy: () => form.copyField(),
    remove: () => form.removeField(),
  };

  return {
    actions,
    setCurrentField,
    editorIsVisible,
    setEditorVisibility,
    currentField,
  };
};
