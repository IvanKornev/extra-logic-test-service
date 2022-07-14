import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Timestamp } from '@lib/converters';

import styles from './form-card.module.scss';
import { UilEllipsisV } from '@iconscout/react-unicons';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Menu,
  MenuItem,
} from '@mui/material';

export const FormCard = ({ form }) => {
  const { title, lastOpeningTimestamp } = form;
  const openingDate = Timestamp.toHumanReadableDate(lastOpeningTimestamp);
  const openingInfo = `Открыто ${openingDate}`;

  const [anchorEl, setAnchorEl] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Card className={styles['Card']}>
      <CardMedia
        component='img'
        height='140'
        image='https://mui.com/static/images/cards/contemplative-reptile.jpg'
        alt='green iguana'
      />
      <CardContent>
        <Typography sx={{ fontSize: '0.9rem', fontWeight: '600' }}>
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography
          sx={{ fontSize: '0.7rem', fontWeight: '600', opacity: '0.6' }}>
          {openingInfo}
        </Typography>
        <div className={styles['footer__icon_menu']}>
          <UilEllipsisV onClick={handleClick} size={20} />
          <FormCardMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </div>
      </CardActions>
    </Card>
  );
};

const FormCardMenu = ({ anchorEl, setAnchorEl }) => {
  const handleClose = () => setAnchorEl(null);
  const isOpen = Boolean(anchorEl);
  return (
    <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
      <MenuItem sx={{ fontSize: '0.8rem' }}>Переименовать</MenuItem>
      <MenuItem sx={{ fontSize: '0.8rem' }}>Удалить</MenuItem>
      <MenuItem sx={{ fontSize: '0.8rem' }}>Открыть в новой вкладке</MenuItem>
    </Menu>
  );
};

FormCard.propTypes = {
  form: PropTypes.shape({
    lastOpeningTimestamp: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
};
