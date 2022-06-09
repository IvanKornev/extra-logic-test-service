import { useReducer } from 'react';
import { formValues } from '@constants';

export const UseTitleFieldHandler = () => {
  const reducer = (state, action) => {
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

  const handle = (event, actionType = 'name') => {
    if (actionType !== 'name' && actionType !== 'description') {
      throw new Error('Передан неправильный action type');
    }
    const action = {
      type: actionType,
      payload: {
        fieldValue: event.currentTarget.value,
      },
    };
    dispatch(action);
  };
  const [fields, dispatch] = useReducer(reducer, formValues);
  return { fields, handle };
};
