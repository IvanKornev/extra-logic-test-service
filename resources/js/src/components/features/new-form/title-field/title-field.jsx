import React, { useId } from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@mui/material';
import { FieldBox } from '@components/reusable';
import { NewFormMenu } from '@components/features/new-form'
import { styles } from './title-field.styles';

export const NewFormTitleField = (props) => {
  const { formikInstance, onClick } = props;
  return (
    <FieldBox onClick={onClick} withBorder>
      {Object.keys(formikInstance.values).map((field) => {
        const id = useId();
        return (
          <TextField
            key={id}
            name={field}
            color='secondary'
            variant='standard'
            value={formikInstance.values[field]}
            onChange={formikInstance.handleChange}
            sx={styles.fields[field]}
          />
        );
      })}
    </FieldBox>
  );
};

NewFormTitleField.propTypes = {
  formikInstance: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
