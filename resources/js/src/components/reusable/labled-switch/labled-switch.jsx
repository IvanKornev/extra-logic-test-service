import React from 'react';
import PropTypes from 'prop-types';

import {
  FormGroup, FormControlLabel, Switch,
} from '@mui/material';

export const LabledSwitch = (props) => {
  const { changeHandler, defaultState, label } = props;
  return(
    <FormGroup>
      <FormControlLabel
        onChange={changeHandler}
        control={
          <Switch
            size="medium"
            color="secondary"
            defaultChecked={defaultState}
          />
        }
        label={label}
        labelPlacement="start"
      />
    </FormGroup>
  );
};

LabledSwitch.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  defaultState: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};
