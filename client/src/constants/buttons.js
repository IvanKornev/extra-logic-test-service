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
        text: 'Авторизоваться',
        icon: UilUserCheck,
        action: 'authorization',
      },
      {
        text: 'Зарегистрироваться',
        icon: UilUserPlus,
        action: 'registration',
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
