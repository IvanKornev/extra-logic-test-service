import React from 'react';
import PropTypes from 'prop-types';

import { FormGroup, FormControlLabel, Switch } from '@mui/material';

export const LabledSwitch = (props) => {
  const { changeHandler, defaultState, label, name } = props;
  return (
    <FormGroup>
      <FormControlLabel
        name={name}
        onChange={changeHandler}
        control={
          <Switch
            size='medium'
            color='secondary'
            defaultChecked={defaultState}
          />
        }
        label={label}
        labelPlacement='start'
      />
    </FormGroup>
  );
};

LabledSwitch.defaultTypes = {
  defaultState: false,
};

LabledSwitch.propTypes = {
  name: PropTypes.string,
  defaultState: PropTypes.bool,
  changeHandler: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
