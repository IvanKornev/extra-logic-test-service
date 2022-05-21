import React from 'react';
import PropTypes from 'prop-types';

import { TextField, Typography, Stack } from '@mui/material';
import { Form, Formik, useFormik } from 'formik';

import { Modal } from '../../../ui-core';
import { select } from '../../../domains';
import { ActionButtons } from '.';

const NewOption = ({ isVisible, abortCallback, setOptions }) => {
  const formik = useFormik({
    initialValues: select.optionValues,
    onSubmit: (values) => {
      const createdOption = select.addOption(values);
      setOptions((prev) => [...prev, createdOption]);
      abortCallback();
    }
  });
  return(
    <Modal open={ isVisible } onClose={ abortCallback }>
      <Typography variant="h5" component="h5">
        Новая опция селектора
      </Typography>
      <Formik initialValues={ select.optionValues } onSubmit={ formik.handleSubmit }>
        <Form>
          <Stack direction="column" spacing={ 1 }>
            { Object.keys(formik.values).map((fieldName) => (
              <TextField
                name={ fieldName }
                label={ fieldName }
                value={ formik.values[fieldName] }
                onChange={ formik.handleChange }
                variant="standard"
              />
            ))}
          </Stack>
          <Stack direction="row" spacing={ 2 }>
            <ActionButtons
              abortCallback={ abortCallback }
            />
          </Stack>
        </Form>
      </Formik>
    </Modal>
  );
};

NewOption.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  abortCallback: PropTypes.func.isRequired,
  setOptions: PropTypes.func.isRequired,
};

export { NewOption };
