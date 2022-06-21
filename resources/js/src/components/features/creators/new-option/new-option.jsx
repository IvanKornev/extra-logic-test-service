import React, { useId, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { TextField } from '@mui/material';

import { CreatorModal } from '@components/reusable';
import { optionValues, optionLabels } from '@constants';

const NewOptionCreator = forwardRef((props, creatorRef) => {
  const { optionsHandlers } = props;
  const formik = useFormik({
    initialValues: optionValues,
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
      submitIsDisable={!formik.values.title || !formik.values.value}
      title='Новая опция селектора'>
      {Object.keys(formik.values).map((fieldName) => (
        <TextField
          id={`new-option-creator__field_${fieldName}`}
          key={useId()}
          name={fieldName}
          label={optionLabels[fieldName]}
          value={formik.values[fieldName]}
          onChange={formik.handleChange}
          variant='standard'
        />
      ))}
    </CreatorModal>
  );
});

NewOptionCreator.propTypes = {
  optionsHandlers: PropTypes.object.isRequired,
};

export { NewOptionCreator };
