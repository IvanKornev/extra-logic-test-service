import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { CreatorModal, ValidatedField } from '@components/reusable';
import { formsStructure } from '@constants';

const OptionCreator = forwardRef((props, creatorRef) => {
  const { formInstance, title } = props;
  return (
    <CreatorModal
      creatingThing='option'
      formInstance={formInstance}
      onCloseCallback={formInstance.resetForm}
      ref={creatorRef}
      title={title}>
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

OptionCreator.propTypes = {
  title: PropTypes.string.isRequired,
  formInstance: PropTypes.object.isRequired,
};

export { OptionCreator };
