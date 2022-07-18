import {
  UilSave,
  UilCancel,
  UilUserPlus,
  UilUserCheck,
} from '@iconscout/react-unicons';

export const buttons = {
  userPanel: {
    unauthorized: [
      {
        color: 'secondary',
        text: 'Войти',
        icon: UilUserCheck,
      },
      {
        color: 'secondary',
        text: 'Зарегистрироваться',
        icon: UilUserPlus,
      },
    ],
  },
  navbar: [
    {
      color: 'secondary',
      text: 'Сохранить',
      action: 'save',
      icon: UilSave,
    },
    {
      color: 'error',
      text: 'Сбросить',
      action: 'reset',
      icon: UilCancel,
    },
  ],
  editorModal: [
    {
      color: 'success',
      text: 'Сохранить',
      type: 'submit',
      action: 'save',
      canBeDisabled: true,
    },
    {
      color: 'error',
      text: 'Отмена',
      type: 'button',
      action: 'abort',
      canBeDisabled: false,
    },
  ],
};
