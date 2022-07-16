import React from 'react';
import PropTypes from 'prop-types';

import { CurrentFormNavbar } from '@components/page-structure/navbars';
import styles from './current-form.module.scss';

export const CurrentFormLayout = ({ children }) => (
  <>
    <CurrentFormNavbar />
    <main className={styles['layout_current-form']}>{children}</main>
  </>
);

CurrentFormLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
