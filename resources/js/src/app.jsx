import React from 'react';
import { createRoot } from 'react-dom/client';

import { NewFormPage } from './pages';
import { app } from './styles';

const App = () => (
  <body>
    <main style={app.page}>
      <NewFormPage />
    </main>
  </body>
);

const rootElem = document.getElementById('root');
if (rootElem) {
  const root = createRoot(rootElem);
  root.render(<App />);
}
