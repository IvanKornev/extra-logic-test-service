export const initialValues = {
  newOption: {
    title: '',
  },
  newField: {
    name: '',
    description: '',
    type: '',
    isRequired: false,
  },
  titleField: {
    name: 'Новая форма',
    description: 'Описание новой формы',
  },
  searchField: {
    authorized: {
      placeholder: 'Найти форму',
      isDisabled: false,
    },
    unauthorized: {
      placeholder: 'Доступно лишь авторизованным пользователям',
      isDisabled: true,
    },
  },
  formTemplates: {
    emptyBlank: {
      name: 'Пустой шаблон',
      isCustomTemplate: true,
    },
  },
};
