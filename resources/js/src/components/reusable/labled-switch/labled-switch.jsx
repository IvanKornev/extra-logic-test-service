import React from 'react';
import PropTypes from 'prop-types';

import { FormGroup, FormControlLabel, Switch } from '@mui/material';
import styles from './labled-switch.module.scss';

export const LabledSwitch = (props) => {
  const { changeHandler, defaultState, label, name, id } = props;
  return (
    <FormGroup id={id}>
      <FormControlLabel
        className={styles['FormControlLabel']}
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

LabledSwitch.defaultProps = {
  defaultState: false,
};

LabledSwitch.propTypes = {
  name: PropTypes.string,
  defaultState: PropTypes.bool,
  changeHandler: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
