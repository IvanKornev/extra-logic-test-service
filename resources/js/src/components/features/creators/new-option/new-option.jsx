import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { CreatorModal, ValidatedField } from '@components/reusable';
import { formsStructure } from '@constants';

const NewOptionCreator = forwardRef((props, creatorRef) => {
  const { formInstance } = props;
  return (
    <CreatorModal
      creatingThing='option'
      formInstance={formInstance}
      ref={creatorRef}
      title='Новая опция селектора'>
      {formsStructure.option.map((field) => (
        <ValidatedField
          field={field}
          name={field.name}
          id={`new-option-creator__field_${field.name}`}
          formInstance={formInstance}
        />
      ))}
    </CreatorModal>
  );
});

NewOptionCreator.propTypes = {
  formInstance: PropTypes.object.isRequired,
};

export { NewOptionCreator };
