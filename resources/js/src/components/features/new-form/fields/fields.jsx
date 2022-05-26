import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@mui/material';
import { FieldBox } from '@components/reusable';

import { styles } from './fields.styles';

const NewFormFields = ({ fields }) => (
  <>
    {fields.length !== 0 &&
      fields.map((field) => (
        <FieldBox key={field.uniqueId}>
          <Typography
            component="h3"
            variant="h6"
            sx={ styles.headings.name }>
            { field.name }
          </Typography>
          <Typography
            component="h3"
            variant="h6"
            sx={ styles.headings.description }>
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
