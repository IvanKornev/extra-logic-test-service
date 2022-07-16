import React from 'react';
import { AllFormsNavbar } from '@components/page-structure/navbars';

export const AllFormsLayout = ({ children }) => (
  <>
    <AllFormsNavbar />
    {children}
  </>
);
