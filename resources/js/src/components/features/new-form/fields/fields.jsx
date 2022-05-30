import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import generateId from 'uniqid';

import { FieldBox, LabledSwitch } from '@components/reusable';
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';

import { styles } from './fields.styles';

const NewFormFields = (props) => {
  const { fields, outsideRef, currentField, callbacks } = props;
  const localRef = useRef(null);
  return (<>
    {fields.length !== 0 &&
      fields.map((field, index) => {
        const wasSelected = (field.uniqueId === currentField?.uniqueId);
        return(
          <FieldBox
            ref={index === 0 ? outsideRef : localRef}
            onClick={(e) => callbacks.fieldBox(e, field)}
            key={field.uniqueId}>
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
            {wasSelected && (
              <LabledSwitch
                defaultState={field.isRequired && true}
                label="Обязательный вопрос"
                changeHandler={callbacks.switch}
              />
            )}
          </FieldBox>
        );
      })}
  </>);
};

NewFormFields.defaultTypes = {
  fields: [],
  currentField: null,
};

NewFormFields.propTypes = {
  fields: PropTypes.array.isRequired,
  outsideRef: PropTypes.object.isRequired,
  currentField: PropTypes.object,
  callbacks: PropTypes.shape({
    switch: PropTypes.func.isRequired,
    fieldBox: PropTypes.func.isRequired,
  }),
};

export { NewFormFields };
