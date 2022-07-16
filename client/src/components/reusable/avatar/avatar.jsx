import React from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react-lite';
import { userState } from '@global-states';

import { generateAbbreviation } from '@lib/generators';
import { Typography } from '@mui/material';
import styles from './avatar.module.scss';

export const Avatar = observer((props) => {
  const { onClick, withHoverEffect, size } = props;
  const { nickname } = userState.profile;

  const abbreviation = generateAbbreviation(nickname);
  const hoverStatus = withHoverEffect.toString();
  return (
    <div
      data-size={size}
      data-with-hover-effect={hoverStatus}
      onClick={onClick}
      className={styles['avatar']}>
      <Typography variant='h6' component='h3'>
        {abbreviation}
      </Typography>
    </div>
  );
});

Avatar.defaultProps = {
  withHoverEffect: false,
  size: 'small',
  onClick: null,
};

Avatar.propTypes = {
  withHoverEffect: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'large']),
  onClick: PropTypes.func,
};