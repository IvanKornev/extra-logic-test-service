import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { newForm, isSelect } from '@domains';

import { Alert, FormControl, InputLabel, MenuItem } from '@mui/material';
import styles from './validated-field.module.scss';

export const ValidatedField = (props) => {
  const { id, formikInstance, field, type } = props;
  const { label, component, name } = field;
  const { values, handleBlur, handleChange } = formikInstance;

  const withError = newForm.hasError(name, formikInstance);
  const CurrentComponent = component.name;
  return (
    <div className={styles['field__wrapper']}>
      <FormControl fullWidth>
        {isSelect(component) && (
          <InputLabel color='secondary'>{label}</InputLabel>
        )}
        <CurrentComponent
          type={type}
          error={withError}
          id={id}
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
            {formikInstance.errors[name]}
          </Alert>
        )}
      </FormControl>
    </div>
  );
};

ValidatedField.defaultProps = {
  type: 'outlined',
};

ValidatedField.propTypes = {
  field: PropTypes.shape({
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    component: PropTypes.shape({
      name: PropTypes.element.isRequired,
      options: PropTypes.array,
    }),
  }),
  type: PropTypes.oneOf(['standard', 'outlined']),
  id: PropTypes.string.isRequired,
  formikInstance: PropTypes.object.isRequired,
};
