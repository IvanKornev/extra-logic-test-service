import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { CreatorModal, ValidatedField } from '@components/reusable';
import { useFormBuilder } from '@hooks';
import { formsStructure } from '@constants';

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
  <>
    {formsStructure.option.map((field) => (
      <ValidatedField
        field={field}
        name={field.name}
        id={`new-option-creator__field_${field.name}`}
        formInstance={formInstance}
      />
    ))}
  </>
);

NewOptionCreator.propTypes = {
  optionsHandlers: PropTypes.object.isRequired,
};

export { NewOptionCreator };
