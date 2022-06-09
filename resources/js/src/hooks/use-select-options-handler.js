import { useReducer } from 'react';
import { selectOptions } from '@domains';

export const useSelectOptionsHandler = (initialList = []) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'add': {
        const { values } = action.payload;
        const optionsList = [...state.optionsList, selectOptions.add(values)];
        return ({ ...state, optionsList });
      }
      default: {
        throw new Error('Некорректный метод опции селектора');
      }
    }
  };
  const initialState = {
    optionsList: initialList,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const add = (values) => {
    const action = {
      type: 'add',
      payload: {
        values,
      },
    };
    dispatch(action);
  };

  const handlers = { add };
  return { state, handlers };
};
