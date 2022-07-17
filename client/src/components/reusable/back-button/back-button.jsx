import React from 'react';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';
import { usePageNavigator } from '@hooks';

import { Button } from '@mui/material';
import { UilHistoryAlt } from '@iconscout/react-unicons';
import styles from './back-button.module.scss';

export const BackButton = (props) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    usePageNavigator(navigate, 'all-forms')([]);
  };
  const { withTextOnMobile } = props;
  return (
    <Button
      data-with-mobile-text={withTextOnMobile.toString()}
      startIcon={<UilHistoryAlt size={30} />}
      color='secondary'
      onClick={clickHandler}
      className={styles['button']}
    />
  );
}

BackButton.defaultProps = {
  withTextOnMobile: false,
};

BackButton.propTypes = {
  withTextOnMobile: PropTypes.bool,
};
