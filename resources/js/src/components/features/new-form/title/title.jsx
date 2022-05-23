import React from 'react';
import PropTypes from 'prop-types';
import generateId from 'uniqid'

import { TextField } from '@mui/material';
import { FieldBox } from '@components/reusable';
import { styles } from './title.styles';

export const NewFormTitle = ({ formikInstance }) => (
  <FieldBox withBorder>
    { Object.keys(formikInstance.values.form).map((field) => (
      <TextField
        key={ generateId() }
        name={ `form.${field}` }
        color="secondary"
        variant="standard"
        value={ formikInstance.values.form[field] }
        onChange={ formikInstance.handleChange }
        sx={ styles.fields[field] }
      />
    ))}
  </FieldBox>
);

NewFormTitle.propTypes = {
  formikInstance: PropTypes.object.isRequired,
};
