import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import generateId from 'uniqid';

import { FieldBox, OptionsList } from '@components/reusable';
import { wasSelected } from '@domains';
import { formFields } from '@constants';
import { Typography } from '@mui/material';
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
  return (
    <>
      {fields.length !== 0 &&
        fields.map((field, index) => (
          <FieldBox
            ref={index === 0 ? outsideRef : localRef}
            onClick={(e) => fieldBoxAction(e, field)}
            key={field.uniqueId}>
            <div style={styles.wrapper}>
              {!wasSelected(
                field.uniqueId,
                currentField?.uniqueId,
              ) && (
                <>
                  {formFields.map((name) => (
                    <Typography
                      key={generateId()}
                      component='h3'
                      variant='h6'
                      sx={styles.heading}>
                      {field[name]}
                    </Typography>
                  ))}
                  {field.type === 'select' && (
                    <OptionsList list={field.selectOptions} />
                  )}
                </>
              )}
              {wasSelected(field.uniqueId, currentField?.uniqueId) && selectedFieldComponent}
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
