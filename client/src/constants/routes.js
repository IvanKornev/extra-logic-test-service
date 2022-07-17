import { NewFormPage, AllFormsPage, FormSearchResultsPage } from '@pages';

export const routes = [
  {
    path: '/form/new',
    element: NewFormPage,
  },
  {
    path: '/',
    element: AllFormsPage,
  },
  {
    path: '/form/search/:query',
    element: FormSearchResultsPage,
  },
];
