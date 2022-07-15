import React from 'react';
import '@styles/reset.scss';

import { CurrentFormLayout } from '@layouts';
import { AppRouter } from './router';

const App = () => (
  <CurrentFormLayout>
    <AppRouter />
  </CurrentFormLayout>
);

export default App;
