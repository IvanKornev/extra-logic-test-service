const fieldsInitialValues = {
  title: 'Новая форма',
  fields: [],
};

const isEmpty = (fields = []) => (fields.length === 0 ? true : false);

export const newForm = {
  fieldsInitialValues,
  isEmpty,
};
