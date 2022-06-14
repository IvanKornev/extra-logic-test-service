import React from 'react';
import { createRoot } from 'react-dom/client';

import { Navbar } from '@components/page-structure';
import { NewFormPage } from './pages';

import styles from './styles/app.module.scss';

const App = () => (
  <>
    <Navbar />
    <main className={styles['page']}>
      <NewFormPage />
    </main>
  </>
);

const rootElem = document.getElementById('root');
if (rootElem) {
  const root = createRoot(rootElem);
  root.render(<App />);
}
