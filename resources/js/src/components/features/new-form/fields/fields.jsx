import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { FieldBox } from '@components/reusable';
import { Typography } from '@mui/material';
import { styles } from './fields.styles';

const NewFormFields = (props) => {
  const {
    fields, outsideRef, currentField, callbacks, selectedFieldComponent,
  } = props;
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
            <div style={styles.wrapper}>
              {!wasSelected && (
                <>
                  <Typography
                    component='h3'
                    variant='h6'
                    sx={styles.heading}>
                    {field.name}
                  </Typography>
                  <Typography
                    component='h3'
                    variant='h6'
                    sx={styles.heading}>
                    {field.description}
                  </Typography>
                </>
              )}
              {wasSelected && selectedFieldComponent}
            </div>
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
  selectedFieldComponent: PropTypes.element.isRequired,
  callbacks: PropTypes.shape({
    switch: PropTypes.func.isRequired,
    fieldBox: PropTypes.func.isRequired,
  }),
};

export { NewFormFields };
