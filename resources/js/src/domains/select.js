export const isSelect = (component) => (
  component.name?.muiName === 'Select'
);

export const selectHasOptions = (elemType, list = []) => (
  (elemType === 'select' && list.length !== 0)
);
