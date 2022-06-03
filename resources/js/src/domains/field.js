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

export const createField = (values) => {
  const createdField = {
    uniqueId: generateId(),
    name: values.name || 'Имя по умолчанию',
    description: values.description || 'Описание по умолчанию',
    type: values.type,
    isRequired: false,
  };

  if (values.type === 'select') {
    createdField.selectOptions = values.selectOptions;
  }
  return createdField;
};

export const copyField = (id, actions) => {
  const { updateFields, setCurrentField } = actions;
  updateFields((list) => {
    const results = list.copy(id);
    setCurrentField(results.copiedValue);
    return results.list;
  });
};

export const removeField = (id, updateFields, refs) => {
  const changedList = updateFields((list) => list.remove(id));
  const { length } = LinkedListConverter.toArray(changedList);

  const { mainFieldRef, titleFieldRef } = refs;
  if (length >= 1) {
    return mainFieldRef.current.click();
  }
  titleFieldRef.current.click();
  return changedList;
};

export const wasSelected = (fieldId, currentFieldId) => {
  if (!fieldId || !currentFieldId) {
    return;
  }
  return fieldId === currentFieldId ? true : false;
};