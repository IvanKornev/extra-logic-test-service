import {
  NewFormPage,
  AllFormsPage,
  FormSearchResultsPage,
  SavedFormPage,
} from '@pages';

export const routes = [
  {
    path: '/form/new',
    element: NewFormPage,
  },
  {
    path: '/form/:formId',
    element: SavedFormPage,
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
