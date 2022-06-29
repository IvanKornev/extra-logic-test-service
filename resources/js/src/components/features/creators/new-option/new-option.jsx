import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

import { CreatorModal, ValidatedField } from '@components/reusable';
import { useFormBuilder } from '@hooks';

const NewOptionCreator = forwardRef((props, creatorRef) => {
  const { optionsHandlers } = props;
  const form = useFormBuilder('new-option')(optionsHandlers, creatorRef);
  return (
    <CreatorModal
      creatingThing='option'
      formInstance={form}
      ref={creatorRef}
      title='Новая опция селектора'>
      <CreatorField formInstance={form} />
    </CreatorModal>
  );
});

const CreatorField = ({ formInstance }) => (
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
    formInstance={formInstance}
  />
);

NewOptionCreator.propTypes = {
  optionsHandlers: PropTypes.object.isRequired,
};

export { NewOptionCreator };
