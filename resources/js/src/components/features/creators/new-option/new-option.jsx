import React, { useId, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { TextField, Alert } from '@mui/material';

import { CreatorModal } from '@components/reusable';
import { optionValues, optionLabels } from '@constants';
import { optionValidationSchema, newForm } from '@domains';

const NewOptionCreator = forwardRef((props, creatorRef) => {
  const { optionsHandlers } = props;
  const formik = useFormik({
    initialValues: optionValues,
    validationSchema: optionValidationSchema,
    onSubmit: (values) => {
      optionsHandlers.add(values);
      creatorRef.current.close();
    },
  });
  const form = {
    initialValues: optionValues,
    formikInstance: formik,
  };
  return (
    <CreatorModal
      creatingThing='option'
      form={form}
      ref={creatorRef}
      title='Новая опция селектора'>
      {Object.keys(formik.values).map((fieldName) => (
        <>
          <TextField
            error={newForm.hasError(fieldName, formik)}
            id={`new-option-creator__field_${fieldName}`}
            key={useId()}
            name={fieldName}
            label={optionLabels[fieldName]}
            value={formik.values[fieldName]}
            onChange={formik.handleChange}
            variant='standard'
          />
          {newForm.hasError(fieldName, formik) && (
            <Alert severity='error'>
              {formik.errors[fieldName]}
            </Alert>
          )}
        </>
      ))}
    </CreatorModal>
  );
});

NewOptionCreator.propTypes = {
  optionsHandlers: PropTypes.object.isRequired,
};

export { NewOptionCreator };
