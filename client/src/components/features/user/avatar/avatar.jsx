import React from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react-lite';
import { userState } from '@global-states';

import { generateAbbreviation } from '@lib/generators';
import { Typography } from '@mui/material';
import styles from './avatar.module.scss';

export const UserAvatar = observer((props) => {
  const { onClick } = props;
  const { nickname } = userState.profile;
  const abbreviation = generateAbbreviation(nickname);
  return (
    <div
      onClick={onClick}
      className={styles['avatar']}>
      <Typography variant='h6' component='h3'>
        {abbreviation}
      </Typography>
    </div>
  );
});

UserAvatar.defaultProps = {
  onClick: null,
};

UserAvatar.propTypes = {
  onClick: PropTypes.func,
};