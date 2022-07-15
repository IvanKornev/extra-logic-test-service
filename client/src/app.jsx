import React from 'react';
import '@styles/reset.scss';

import { AllFormsLayout } from '@layouts';
import { AppRouter } from './router';

const App = () => (
  <AllFormsLayout>
    <AppRouter />
  </AllFormsLayout>
);

export default App;
