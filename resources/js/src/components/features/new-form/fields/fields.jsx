import React from 'react';
import PropTypes from 'prop-types';
import generateId from 'uniqid';

import { FieldBox } from '@components/reusable';
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';

import { styles } from './fields.styles';

const NewFormFields = ({ fields, selectCallback }) => (
  <>
    {fields.length !== 0 &&
      fields.map((field) => (
        <FieldBox onClick={(e) => selectCallback(e, field)} key={field.uniqueId}>
          <Typography component='h3' variant='h6' sx={styles.headings.name}>
            {field.name}
          </Typography>
          {(field.type === 'text' || field.type === 'textarea') && (
            <TextField
              variant='standard'
              value={field.description}
              sx={styles.fields.description}
              color='secondary'
              readOnly
            />
          )}
          {field.type === 'select' && (
            <FormControl size='small'>
              <Typography
                component='h3'
                variant='h6'
                sx={styles.headings.description}>
                {field.description}
              </Typography>
              <Select value={field.selectOptions[0].value} color='secondary'>
                {field.selectOptions.map((option) => (
                  <MenuItem value={option.value} key={generateId()}>
                    {option.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </FieldBox>
      ))}
  </>
);

NewFormFields.propTypes = {
  fields: PropTypes.array.isRequired,
  selectCallback: PropTypes.func,
};

export { NewFormFields };
