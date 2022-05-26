import React, { useId, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@mui/material';
import { FieldBox } from '@components/reusable';
import { styles } from './title.styles';

export const NewFormTitle = forwardRef((props, ref) => {
  const { formikInstance, onClick } = props;
  return(
    <div ref={ref}>
      <FieldBox onClick={onClick} withBorder>
        {Object.keys(formikInstance.values.form).map((field) => {
          const id = useId();
          return (
            <TextField
              key={id}
              name={`form.${field}`}
              color='secondary'
              variant='standard'
              value={formikInstance.values.form[field]}
              onChange={formikInstance.handleChange}
              sx={styles.fields[field]}
            />
          );
        })}
      </FieldBox>
    </div>
  );
});

NewFormTitle.propTypes = {
  formikInstance: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
