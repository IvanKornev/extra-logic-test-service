import React from 'react';
import PropTypes from 'prop-types';

import { generateAbbreviation } from '@lib/generators';
import { Typography } from '@mui/material';
import styles from './avatar.module.scss';

export const UserAvatar = (props) => {
  const { nickname } = props;
  const abbreviation = generateAbbreviation(nickname);
  return (
    <div className={styles['avatar']}>
      <Typography variant='h6' component='h3'>
        {abbreviation}
      </Typography>
    </div>
  );
};

UserAvatar.propTypes = {
  nickname: PropTypes.string.isRequired,
};
