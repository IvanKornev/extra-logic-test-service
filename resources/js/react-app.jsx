import React from 'react'
import { createRoot } from 'react-dom/client'
import { NewForm } from './new-form'

const rootElem = document.getElementById('root')
if (rootElem) {
  const root = createRoot(rootElem)
  root.render(<NewForm />)
}
