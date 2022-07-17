export const usePageNavigator =
  (navigateInstance, pageName) =>
  (...params) => {
    switch (pageName) {
      case 'form-search-results':
        goToFormSearchResults(params);
        break;
      case 'all-forms':
        goToAllForms();
        break;
      default:
        throw new Error('SPA не имеет страницы с таким названием');
    }

    function goToAllForms() {
      const route = '/';
      navigateInstance(route);
    }

    function goToFormSearchResults(params) {
      const [query] = params;
      const route = `/form/search/${query}`;
      navigateInstance(route);
    }
  };
