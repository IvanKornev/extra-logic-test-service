export const buttons = {
  navbar: [
    {
      color: 'secondary',
      text: 'Сохранить',
      action: 'save',
    },
    {
      color: 'error',
      text: 'Сбросить',
      action: 'reset',
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
