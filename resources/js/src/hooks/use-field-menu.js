import { useState, useRef, useEffect } from 'react';
import { fieldEditor } from '@domains/field-editor';

export const useFieldMenu = (updateFields) => {
  const [editorIsVisible, setEditorVisibility] = useState(false);
  const [currentField, setCurrentField] = useState(null);

  const [anchorElem, setAnchorElem] = useState(null);
  const refs = {
    mainField: useRef(null),
    titleField: useRef(null),
  };
  useEffect(() => setAnchorElem(refs.titleField.current), []);

  const actions = {
    add: () => setEditorVisibility(true),
    copy: () => {
      const callbacks = { updateFields, setCurrentField };
      fieldEditor.copy(currentField.uniqueId, callbacks);
    },
    remove: () => {
      fieldEditor.remove(currentField.uniqueId, updateFields, refs);
    },
  };

  const selectField = (event, field = null) => {
    setCurrentField(field);
    setAnchorElem(event.currentTarget);
  };

  return {
    anchorElem,
    refs,
    actions,
    selectField,
    editorIsVisible,
    setEditorVisibility,
    currentField,
  };
};
