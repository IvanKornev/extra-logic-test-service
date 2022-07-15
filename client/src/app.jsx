import React from 'react';

import { Navbar } from '@components/page-structure';
import { AppRouter } from './router';

import '@styles/app.scss';

const App = () => (
  <>
    <Navbar />
    <main className='page'>
      <AppRouter />
    </main>
  </>
);

export default App;
