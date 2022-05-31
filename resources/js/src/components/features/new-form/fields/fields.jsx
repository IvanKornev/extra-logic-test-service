import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import generateId from 'uniqid';

import { fieldEditor } from '@domains';
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
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  return (<>
    {fields.length !== 0 &&
      fields.map((field, index) => {
        const wasSelected = (field.uniqueId === currentField?.uniqueId);
        return(
          <FieldBox
            ref={index === 0 ? outsideRef : localRef}
            onClick={(e) => callbacks.fieldBox(e, field)}
            key={field.uniqueId}>
            <div style={styles.wrapper}>
              <NewFormField
                wasSelected={wasSelected}
                action={setName}
                state={name}
                field={field.name}
              />
              <NewFormField
                wasSelected={wasSelected}
                action={setDescription}
                state={description}
                field={field.description}
              />      
              {wasSelected && (
                <>
                  <FormControl size='small'>
                    <Select value={field.type} color='secondary' sx={styles.select}>
                      {fieldEditor.types.map((type) => (
                        <MenuItem
                          value={type.value}
                          key={generateId()}>
                          {type.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <LabledSwitch
                    defaultState={field.isRequired && true}
                    label="Обязательный вопрос"
                    changeHandler={callbacks.switch}
                  />
                </>
              )}
            </div>
          </FieldBox>
        );
      })}
  </>);
};

const NewFormField = ({ wasSelected, field, state, action }) => (
  <>
    {wasSelected && (
      <TextField
        color='secondary'
        variant='standard'
        placeholder={field}
        value={state}
        onChange={(e) => action(e.target.value)}
        sx={styles.field}
      />
    )}
    {!wasSelected && (
      <Typography
        component='h3'
        variant='h6'
        sx={styles.heading}>
        {field}
      </Typography>
    )}
  </>
);

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
