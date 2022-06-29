import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { newForm, isSelect } from '@domains';

import { Alert, FormControl, InputLabel, MenuItem } from '@mui/material';
import styles from './validated-field.module.scss';

export const ValidatedField = (props) => {
  const { id, formInstance, field, variant, className } = props;
  const { component, name } = field;
  const { values, handleBlur, handleChange } = formInstance;

  const withError = newForm.hasError(name, formInstance);
  const label = field?.label;
  const CurrentComponent = component.name;
  return (
    <div className={styles['field__wrapper']}>
      <FormControl fullWidth>
        {isSelect(component) && (
          <InputLabel color='secondary'>{label}</InputLabel>
        )}
        <CurrentComponent
          variant={variant}
          error={withError}
          id={id}
          className={className}
          name={name}
          label={label}
          value={values[name]}
          onBlur={handleBlur}
          onChange={handleChange}
          color='secondary'>
          {isSelect(component) &&
            component.options.map((option, index) => (
              <MenuItem
                key={useId()}
                id={`new-field-editor__option_${index + 1}`}
                value={option.value}>
                {option.title}
              </MenuItem>
            ))}
        </CurrentComponent>
        {withError && (
          <Alert className={styles['Alert']} severity='error'>
            {formInstance.errors[name]}
          </Alert>
        )}
      </FormControl>
    </div>
  );
};

ValidatedField.defaultProps = {
  variant: 'outlined',
};

ValidatedField.propTypes = {
  field: PropTypes.shape({
    placeholder: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    component: PropTypes.shape({
      name: PropTypes.object.isRequired,
      options: PropTypes.array,
    }),
  }),
  variant: PropTypes.oneOf(['standard', 'outlined']),
  id: PropTypes.string,
  className: PropTypes.string,
  formInstance: PropTypes.object.isRequired,
};
