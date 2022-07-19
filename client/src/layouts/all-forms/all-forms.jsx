import React from 'react';
import PropTypes from 'prop-types';
import { AllFormsNavbar } from '@components/page-structure/navbars';

export const AllFormsLayout = ({ children }) => (
  <>
    <AllFormsNavbar />
    {children}
  </>
);

AllFormsLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
