import { useReducer } from 'react';
import {
  addSelectOption,
  editSelectOption,
  removeSelectOption,
  compareOptionLists,
} from '@entities';

export const useSelectOptionsHandler = (initialList = []) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'add': {
        const { values } = action.payload;
        return changeList(() => [...state.list, addSelectOption(values)]);
      }
      case 'edit': {
        const { values } = action.payload;
        return changeList(() => editSelectOption(values, state.list));
      }
      case 'remove': {
        const { optionId } = action.payload;
        return changeList(() => removeSelectOption(optionId, state.list));
      }
      case 'removeAll': {
        return changeList(() => []);
      }
      default: {
        throw new Error('Некорректный метод опции селектора');
      }
    }
  };

  const changeList = (listCallback) => {
    const list = listCallback();
    const wasUpdated = compareOptionLists(initialList, list);
    return { list, wasUpdated };
  };

  const initialState = { list: initialList, wasUpdated: false };
  const [optionsState, dispatch] = useReducer(reducer, initialState);
  const handlers = {
    add: (values) => dispatch({ type: 'add', payload: { values } }),
    edit: (values) => dispatch({ type: 'edit', payload: { values } }),
    remove: (optionId) => dispatch({ type: 'remove', payload: { optionId } }),
    removeAll: () => dispatch({ type: 'removeAll' }),
  };
  return { optionsState, handlers };
};
