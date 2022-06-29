import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

import { CreatorModal, ValidatedField } from '@components/reusable';
import { optionValues } from '@constants';
import { useFormBuilder } from '@hooks';

const NewOptionCreator = forwardRef((props, creatorRef) => {
  const { optionsHandlers } = props;
  const formik = useFormBuilder('new-option')(optionsHandlers, creatorRef);
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
