import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageNavigator } from '@hooks';

export const useSearchFieldHandler = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const goToSearchResults = () => {
    usePageNavigator(navigate, 'form-search-results')(value);
  };

  const query = {
    value,
    set: (event) => setValue(event.target.value),
    isEmpty: () => (value.length === 0 ? true : false),
    erase: () => setValue(''),
  };

  const events = {
    keyDown: (event) => {
      if (event.key === 'Enter' && !query.isEmpty()) {
        goToSearchResults();
      }
    },
    click: () => !query.isEmpty() && goToSearchResults(),
  };

  const handler = { query, events };
  return handler;
};
