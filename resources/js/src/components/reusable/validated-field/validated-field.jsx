import PropTypes from 'prop-types';
import { newForm } from '@domains';

import { Alert } from '@mui/material';
import styles from './validated-field.module.scss';

export const ValidatedField = (props) => {
  const { children, formikInstance, name } = props;
  const withError = newForm.hasError(name, formikInstance);
  return (
    <div className={styles['field__wrapper']}>
      {children}
      {withError && (
        <Alert className={styles['Alert']} severity='error'>
          {formikInstance.errors[name]}
        </Alert>
      )}
    </div>
  );
};

ValidatedField.propTypes = {
  children: PropTypes.element.isRequired,
  formikInstance: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};
