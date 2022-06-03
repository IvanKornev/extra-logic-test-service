import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { TextField } from '@mui/material';

import { EditorModal } from '@components/reusable';
import { selectOptions } from '@domains';

const NewOptionEditor = ({ isVisible, abortCallback, setOptions }) => {
  const formik = useFormik({
    initialValues: selectOptions.values,
    onSubmit: (values) => {
      const createdOption = selectOptions.add(values);
      setOptions((prev) => [...prev, createdOption]);
      abortCallback();
    },
  });
  const formData = {
    initialValues: selectOptions.values,
    formikInstance: formik,
  };
  return (
    <EditorModal
      isVisible={isVisible}
      onClose={abortCallback}
      form={formData}
      abortCallback={abortCallback}
      disableCondition={!formik.values.title || !formik.values.value}
      title='Новая опция селектора'>
      {Object.keys(formik.values).map((fieldName) => {
        const id = useId();
        return (
          <TextField
            key={id}
            name={fieldName}
            label={selectOptions.labels[fieldName]}
            value={formik.values[fieldName]}
            onChange={formik.handleChange}
            variant='standard'
          />
        );
      })}
    </EditorModal>
  );
};

NewOptionEditor.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  abortCallback: PropTypes.func.isRequired,
  setOptions: PropTypes.func.isRequired,
};

export { NewOptionEditor };
