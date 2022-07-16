import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Timestamp } from '@lib/converters';
import { removeForm } from '@api';

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
  const { title, lastOpeningTimestamp, id } = form;
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
          <FormCardMenu
            formId={id}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
          />
        </div>
      </CardActions>
    </Card>
  );
};

const FormCardMenu = ({ formId, anchorEl, setAnchorEl }) => {
  const handleClose = () => setAnchorEl(null);

  const removeHandler = async () => {
    const response = await removeForm(formId);
    handleClose();
  };

  const isOpen = Boolean(anchorEl);
  return (
    <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
      <MenuItem sx={{ fontSize: '0.8rem' }}>Переименовать</MenuItem>
      <MenuItem onClick={removeHandler} sx={{ fontSize: '0.8rem' }}>
        Удалить
      </MenuItem>
      <MenuItem sx={{ fontSize: '0.8rem' }}>Открыть в новой вкладке</MenuItem>
    </Menu>
  );
};

FormCard.propTypes = {
  form: PropTypes.shape({
    lastOpeningTimestamp: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
};
