import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@mui/material';
import { FieldBox } from '@components/reusable';

const NewFormFields = ({ fields }) => (
  <>
    {fields.length !== 0 &&
      fields.map((field) => (
        <FieldBox key={field.uniqueId}>
          <Typography component="h3" variant="h6">
            { field.name }
          </Typography>
          <Typography component="h3" variant="h6">
            { field.description }
          </Typography>
        </FieldBox>
      ))
    }
  </>
);

NewFormFields.propTypes = {
  fields: PropTypes.array.isRequired,
};

export { NewFormFields };
