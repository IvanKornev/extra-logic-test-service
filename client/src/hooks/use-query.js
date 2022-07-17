import { useState, useEffect } from 'react';

export const useQuery = (apiCallback, dependencies = []) => {
  const [results, setResults] = useState({
    templatesList: [],
    formsList: [],
    searchedForms: [],
  });

  console.log(apiCallback);

  useEffect(() => {
    const makeQuery = async () => {
      const response = await apiCallback;
      setResults(response);
    };
    makeQuery();
  }, dependencies);

  return results;
};
