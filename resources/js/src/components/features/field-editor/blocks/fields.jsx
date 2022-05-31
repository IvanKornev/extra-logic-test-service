import React, { useId } from 'react';
import PropTypes from 'prop-types';

import { fieldEditor, select, selectOptions } from '@domains';

const Fields = ({ formikInstance }) => (
  <>
    {fieldEditor.fields.map((field) => {
      const { name, label, component } = field;
      const id = useId();

      const { isSelect } = select;
      const { render } = selectOptions;
      const renderedOptions = isSelect(component) && render(component);
      const CurrentComponent = component.name;
      return (
        <CurrentComponent
          key={id}
          id={name}
          name={name}
          label={label}
          value={formikInstance.values[name]}
          variant='standard'
          color='primary'
          onChange={formikInstance.handleChange}>
          {renderedOptions}
        </CurrentComponent>
      );
    })}
  </>
);

Fields.propTypes = {
  formikInstance: PropTypes.object.isRequired,
};

export { Fields };
