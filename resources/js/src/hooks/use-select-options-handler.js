import { useReducer } from 'react';
import {
  addSelectOption,
  editSelectOption,
  removeSelectOption,
} from '@domains';

export const useSelectOptionsHandler = (initialList = []) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'add': {
        const { values } = action.payload;
        const optionsList = [...state.optionsList, addSelectOption(values)];
        return { ...state, optionsList };
      }
      case 'edit': {
        const { values } = action.payload;
        const optionsList = editSelectOption(values, state.optionsList);
        return { ...state, optionsList };
      }
      case 'remove': {
        const { optionId } = action.payload;
        const optionsList = removeSelectOption(optionId, state.optionsList);
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
  const [{ optionsList }, dispatch] = useReducer(reducer, initialState);

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
  return { optionsList, handlers };
};
