import React from 'react';
import { createRoot } from 'react-dom/client';
import { NewFormEditor } from './new-form-editor';

const rootElem = document.getElementById('root');
if (rootElem) {
  const root = createRoot(rootElem);
  root.render(<NewFormEditor />);
}
