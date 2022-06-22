import { useReducer } from 'react';
import {
  addSelectOption,
  editSelectOption,
  removeSelectOption,
  compareOptionLists,
} from '@domains';

export const useSelectOptionsHandler = (initialList = []) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'add': {
        const { values } = action.payload;
        const list = [...state.list, addSelectOption(values)];
        const wasUpdated = compareOptionLists(initialList, list);
        return { list, wasUpdated };
      }
      case 'edit': {
        const { values } = action.payload;
        const list = editSelectOption(values, state.list);
        const wasUpdated = compareOptionLists(initialList, list);
        return { list, wasUpdated };
      }
      case 'remove': {
        const { optionId } = action.payload;
        const list = removeSelectOption(optionId, state.list);
        const wasUpdated = compareOptionLists(initialList, list);
        return { list, wasUpdated };
      }
      default: {
        throw new Error('Некорректный метод опции селектора');
      }
    }
  };

  const initialState = { list: initialList, wasUpdated: false };
  const [optionsState, dispatch] = useReducer(reducer, initialState);
  const handlers = {
    add: (values) => dispatch({ type: 'add', payload: { values } }),
    edit: (values) => dispatch({ type: 'edit', payload: { values } }),
    remove: (optionId) => dispatch({ type: 'remove', payload: { optionId } }),
  };
  return { optionsState, handlers };
};
