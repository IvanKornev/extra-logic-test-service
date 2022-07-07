import { UilSave, UilCancel } from '@iconscout/react-unicons';

export const buttons = {
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
