export const isSelect = (component) => component.name?.muiName === 'Select';

export const selectIsEmpty = (type, list = []) => {
  if (type !== 'select') {
    return false;
  }
  return !!(type === 'select' && list.length === 0);
};
