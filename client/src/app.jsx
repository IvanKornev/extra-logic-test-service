import React from 'react';

import { Navbar } from '@components/page-structure';
import { NewFormPage, AllFormsPage } from '@pages';
import '@styles/app.scss';

const App = () => (
  <>
    <Navbar />
    <main className='page'>
      <AllFormsPage />
      {/* <NewFormPage /> */}
    </main>
  </>
);

export default App;
