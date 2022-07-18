import {
  FormPage,
  AllFormsPage,
  FormSearchResultsPage,
} from '@pages';

export const routes = [
  {
    path: '/form/new',
    element: FormPage,
  },
  {
    path: '/form/:formId',
    element: FormPage,
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
