import React, { useId, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { TextField } from '@mui/material';

import { CreatorModal, ValidatedField } from '@components/reusable';
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
        <CreatorField name={fieldName} formikInstance={formik} key={useId()} />
      ))}
    </CreatorModal>
  );
});

const CreatorField = ({ name, formikInstance }) => {
  const { values, handleChange, handleBlur } = formikInstance;
  const withError = newForm.hasError(name, formikInstance);
  return (
    <ValidatedField name={name} formikInstance={formikInstance}>
      <TextField
        error={withError}
        id={`new-option-creator__field_${name}`}
        name={name}
        label={optionLabels[name]}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        variant='standard'
      />
    </ValidatedField>
  );
};

NewOptionCreator.propTypes = {
  optionsHandlers: PropTypes.object.isRequired,
};

export { NewOptionCreator };
