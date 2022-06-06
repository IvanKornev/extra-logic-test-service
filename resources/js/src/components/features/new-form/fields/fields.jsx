import React, { useId } from 'react';
import PropTypes from 'prop-types';
import generateId from 'uniqid';

import { FieldBox, OptionsList, RequiredFieldMark } from '@components/reusable';

import { wasSelected } from '@domains';
import { formFields } from '@constants';
import { Typography, Stack, TextField } from '@mui/material';
import { styles } from './fields.styles';

const NewFormFields = (props) => {
  const {
    fields, currentField, fieldBoxAction, selectedFieldComponent, formikInstance, children,
  } = props;
  const currentId = currentField?.uniqueId;
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', flexDirection: 'row', rowGap: '4px', margin: '8px 0' }}>
      <FieldBox onClick={() => fieldBoxAction(null)} withBorder>
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
              sx={styles.titleFields[field]}
            />
          );
        })}
      </FieldBox>
      {!currentField && children}
    </div>
      {fields.length !== 0 &&
        fields.map((field) => (
          <div style={{ display: 'flex', flexDirection: 'row', rowGap: '8px', margin: '8px 0' }}>
             <FieldBox
              onClick={() => fieldBoxAction(field)}
              key={field.uniqueId}>
              <div style={styles.wrapper}>
                {!wasSelected(field.uniqueId, currentId) && (
                  <>
                    {formFields.map((name) => (
                      <Stack direction='row'>
                        <Typography
                          key={generateId()}
                          component='h3'
                          variant='h6'
                          sx={styles.heading}>
                          {field[name]}
                        </Typography>
                        {field.isRequired && name === 'name' && (
                          <RequiredFieldMark />
                        )}
                      </Stack>
                    ))}
                    {field.type === 'select' && (
                      <OptionsList list={field.selectOptions} />
                    )}
                  </>
                )}
                {wasSelected(field.uniqueId, currentId) && selectedFieldComponent}
              </div>
            </FieldBox>
            {wasSelected(field.uniqueId, currentId) && children}
          </div>
        ))}
    </div>
  );
};

NewFormFields.defaultTypes = {
  fields: [],
  currentField: null,
};

NewFormFields.propTypes = {
  children: PropTypes.node.isRequired,
  fields: PropTypes.array.isRequired,
  currentField: PropTypes.object,
  selectedFieldComponent: PropTypes.element.isRequired,
  fieldBoxAction: PropTypes.func.isRequired,
  formikInstance: PropTypes.object.isRequired,
};

export { NewFormFields };
