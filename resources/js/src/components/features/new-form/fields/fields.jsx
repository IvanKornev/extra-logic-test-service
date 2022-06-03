import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import generateId from 'uniqid';

import { FieldBox, OptionsList, RequiredFieldMark } from '@components/reusable';
import { wasSelected } from '@domains';
import { formFields } from '@constants';
import { Typography, Stack } from '@mui/material';
import { styles } from './fields.styles';

const NewFormFields = (props) => {
  const {
    fields,
    outsideRef,
    currentField,
    fieldBoxAction,
    selectedFieldComponent,
  } = props;
  const localRef = useRef(null);
  const currentId = currentField?.uniqueId;
  return (
    <>
      {fields.length !== 0 &&
        fields.map((field, index) => (
          <FieldBox
            ref={index === 0 ? outsideRef : localRef}
            onClick={(e) => fieldBoxAction(e, field)}
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
        ))}
    </>
  );
};

NewFormFields.defaultTypes = {
  fields: [],
  currentField: null,
};

NewFormFields.propTypes = {
  fields: PropTypes.array.isRequired,
  outsideRef: PropTypes.object.isRequired,
  currentField: PropTypes.object,
  selectedFieldComponent: PropTypes.element.isRequired,
  fieldBoxAction: PropTypes.func.isRequired,
};

export { NewFormFields };
