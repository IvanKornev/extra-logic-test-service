export const initialValues = {
  option: {
    new: {
      title: '',
    },
  },
  user: {
    form: {
      authorization: {
        email: '',
        password: '',
      },
      registration: {
        nickname: '',
        email: '',
        password: '',
      },
    },
    dialog: {
      title: {
        authorization: 'Авторизация',
        registration: 'Регистрация',
      },
      submitButton: {
        authorization: 'Авторизоваться',
        registration: 'Зарегистрироваться',
      },
      closeButton: {
        authorization: 'Я войду позже',
        registration: 'Закрыть',
      },
    },
  },
  field: {
    new: {
      name: '',
      description: '',
      type: '',
      isRequired: false,
    },
    title: {
      name: 'Новая форма',
      description: 'Описание новой формы',
    },
    search: {
      authorized: {
        placeholder: 'Найти форму',
        isDisabled: false,
      },
      unauthorized: {
        placeholder: 'Доступно лишь авторизованным пользователям',
        isDisabled: true,
      },
    },
  },
  formTemplates: {
    emptyBlank: {
      name: 'Пустой шаблон',
      isCustomTemplate: true,
    },
  },
};
