import React from 'react';

import { Navbar } from '@components/page-structure';
import { NewFormPage } from '@pages';
import '@styles/app.scss';

const App = () => (
  <>
    <Navbar />
    <main className='page'>
      <NewFormPage />
    </main>
  </>
);

export default App;
