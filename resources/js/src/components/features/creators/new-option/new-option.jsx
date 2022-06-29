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
      <CreatorField formikInstance={formik} />
    </CreatorModal>
  );
});

const CreatorField = ({ formikInstance }) => (
  <ValidatedField
    field={{
      name: 'title',
      label: 'Наименование',
      component: {
        name: TextField,
      },
    }}
    name='title'
    id='new-option-creator__field_title'
    formikInstance={formikInstance}
  />
);

NewOptionCreator.propTypes = {
  optionsHandlers: PropTypes.object.isRequired,
};

export { NewOptionCreator };
