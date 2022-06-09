import { useReducer } from 'react';

export const useFieldsHandler = (reducer, initialValue) => {
  const handle = (event, actionType) => {
    const action = {
      type: actionType,
      payload: {
        fieldValue: event.currentTarget.value,
      },
    };
    dispatch(action);
  };
  const [fields, dispatch] = useReducer(reducer, initialValue);
  return { fields, handle };
};
