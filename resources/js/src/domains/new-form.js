const defaultValues = {
  form: {
    name: 'Новая форма',
    description: 'Описание новой формы',
  },
};

const isEmpty = (fields = []) => (
  fields.length === 0 ? true : false
);

export const newForm = {
  defaultValues,
  isEmpty,
};
