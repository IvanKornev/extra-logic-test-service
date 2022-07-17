export const usePageNavigator =
  (navigateInstance, pageName) =>
  (...params) => {
    switch (pageName) {
      case 'form-search-results':
        goToFormSearchResults(params);
      default:
        throw new Error('SPA не имеет страницы с таким названием');
    }

    function goToFormSearchResults(params) {
      const [query] = params;
      const route = `/form/search/${query}`;
      navigateInstance(route);
    }
  };
