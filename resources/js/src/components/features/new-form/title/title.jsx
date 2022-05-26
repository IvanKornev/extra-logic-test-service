import React, { useId } from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@mui/material';
import { FieldBox } from '@components/reusable';
import { styles } from './title.styles';

export const NewFormTitle = ({ formikInstance, onClick }) => (
  <FieldBox onClick={ onClick } withBorder>
    { Object.keys(formikInstance.values.form).map((field) => {
      const id = useId();
      return(
        <TextField
          key={ id }
          name={ `form.${field}` }
          color="secondary"
          variant="standard"
          value={ formikInstance.values.form[field] }
          onChange={ formikInstance.handleChange }
          sx={ styles.fields[field] }
        />
      );
    })}
  </FieldBox>
);

NewFormTitle.propTypes = {
  formikInstance: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
