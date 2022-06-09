export const selectOptionReducer = (state, action) => {
  const { fieldValue } = action.payload;
  switch (action.type) {
    case 'title':
      return { ...state, title: fieldValue };
    case 'value':
      return { ...state, value: fieldValue };
    default:
      throw new Error('Некорректное поле');
  }
};
