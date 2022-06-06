import generateId from 'uniqid';
import PropTypes from 'prop-types';
import { LinkedListConverter } from '@lib/converters';

export const fieldAttributes = PropTypes.shape({
  uniqueId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'textarea', 'select']),
  isRequired: PropTypes.bool,
});

export const createField = (values, updateAction) => {
  const createdField = {
    uniqueId: generateId(),
    name: values.name || 'Имя по умолчанию',
    description: values.description || 'Описание по умолчанию',
    type: values.type,
    isRequired: values.isRequired,
  };

  if (values.type === 'select') {
    createdField.selectOptions = values.selectOptions;
  }
  updateAction((list) => list.insert(createdField));
};

export const removeField = (id, actions) => {
  const { updateFields, setCurrentField } = actions;
  updateFields((list) => {
    const { removedNode } = list.remove(id);
    if (removedNode?.next) {
      const nextField = removedNode.next.value;
      setCurrentField(nextField);
    } else if (list.head && !removedNode.next) {
      const firstField = list.head.value;
      setCurrentField(firstField);
    } else {
      setCurrentField(null);
    }
    return list;
  });
};

export const changeField = (id, values, actions) => {
  const { updateFields, setCurrentField } = actions;
  updateFields((list) => list.change(id, values));
  setCurrentField(null);
};

export const copyField = (id, actions) => {
  const { updateFields, setCurrentField } = actions;
  updateFields((list) => {
    const results = list.copy(id);
    setCurrentField(results.copiedValue);
    return results.list;
  });
};

export const wasSelected = (fieldId, currentFieldId) => {
  if (!fieldId || !currentFieldId) {
    return;
  }
  return fieldId === currentFieldId ? true : false;
};
