export const titleFieldReducer = (state, action) => {
  const { fieldValue } = action.payload;
    switch (action.type) {
      case 'name':
        return { ...state, name: fieldValue };
      case 'description':
        return { ...state, description: fieldValue };
     default:
      throw new Error('Некорректное поле');
  }
};
