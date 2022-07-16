import React from 'react';
import PropTypes from 'prop-types';

import { Menu, Button } from '@mui/material';

export const UserPanel = (props) => {
  const { panelHookInstance } = props;
  const { elem, drop } = panelHookInstance;
  const isOpen = Boolean(elem);
  return (
    <Menu
      onClose={drop}
      anchorEl={elem}
      open={isOpen}>
      <Button>
        Выйти
      </Button>
    </Menu>
  );
};

UserPanel.propTypes = {
  panelHookInstance: PropTypes.shape({
    elem: PropTypes.object.isRequired,
    set: PropTypes.func.isRequired,
    drop: PropTypes.func.isRequired,
  }),
};
