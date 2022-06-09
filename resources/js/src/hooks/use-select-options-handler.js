import { useReducer } from 'react';
import { selectOptions } from '@domains';

export const useSelectOptionsHandler = (initialList = []) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'add': {
        const { values } = action.payload;
        const optionsList = [...state.optionsList, selectOptions.add(values)];
        return { ...state, optionsList };
      }
      case 'edit': {
        const { values } = action.payload;
        const optionsList = selectOptions.edit(values, state.optionsList);
        return { ...state, optionsList };
      }
      case 'remove': {
        const { optionId } = action.payload;
        const optionsList = selectOptions.remove(optionId, state.optionsList);
        return { ...state, optionsList };
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

  const edit = (values) => {
    const action = {
      type: 'edit',
      payload: {
        values,
      },
    };
    dispatch(action);
  };

  const remove = (optionId) => {
    const action = {
      type: 'remove',
      payload: {
        optionId,
      },
    };
    dispatch(action);
  };

  const handlers = { add, edit, remove };
  return { state, handlers };
};
