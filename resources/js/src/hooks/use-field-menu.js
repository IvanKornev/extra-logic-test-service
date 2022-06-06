import { useState } from 'react';
import { copyField, removeField } from '@domains';

export const useFieldMenu = (updateFields) => {
  const [editorIsVisible, setEditorVisibility] = useState(false);
  const [currentField, setCurrentField] = useState(null);

  const callbacks = { updateFields, setCurrentField };
  const actions = {
    add: () => setEditorVisibility(true),
    copy: () => {
      copyField(currentField.uniqueId, callbacks);
    },
    remove: () => {
      removeField(currentField.uniqueId, callbacks);
    },
  };

  return {
    actions,
    setCurrentField,
    editorIsVisible,
    setEditorVisibility,
    currentField,
  };
};
