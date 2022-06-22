export const isSelect = (component) => component.name?.muiName === 'Select';
export const selectHasOptions = (list = []) => list.length !== 0;
