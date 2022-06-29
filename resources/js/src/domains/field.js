import generateId from 'uniqid';
import PropTypes from 'prop-types';

export const fieldAttributes = PropTypes.shape({
  uniqueId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'textarea', 'select']),
  isRequired: PropTypes.bool,
});

export const createField = (values, list) => {
  const createdField = {
    uniqueId: generateId(),
    name: values.name,
    description: values.description,
    type: values.type,
    isRequired: values.isRequired,
  };

  if (values.type === 'select') {
    createdField.selectOptions = values.selectOptions;
  }
  return list.insert(createdField);
};

export const removeField = (id, list) => {
  const { removedNode } = list.remove(id);
  if (removedNode?.previous) {
    const previousNode = removedNode.previous.value;
    return previousNode;
  }
  if (removedNode?.next) {
    const nextNode = removedNode.next.value;
    return nextNode;
  }
  return null;
};

export const getField = (field, list) => {
  const { position } = list.find(field.uniqueId);
  const cachedField = {
    values: { ...field },
    position,
  };
  return cachedField;
};

export const changeField = (id, values, list) => {
  list.change(id, values);
};

export const copyField = (id, list) => list.copy(id);

export const wasSelected = (fieldId, currentFieldId) =>
  fieldId && currentFieldId && fieldId === currentFieldId && true;
