import React from 'react';
import PropTypes from 'prop-types';

import { TextField, Typography, Stack } from '@mui/material';
import { Form, Formik, useFormik } from 'formik';

import { Modal, ActionButtons } from '@components/reusable';
import { select } from '@domains';

const NewOption = ({ isVisible, abortCallback, setOptions }) => {
  const formik = useFormik({
    initialValues: select.optionValues,
    onSubmit: (values) => {
      const createdOption = select.addOption(values);
      setOptions((prev) => [...prev, createdOption]);
      abortCallback();
    },
  });
  return (
    <Modal open={isVisible} onClose={abortCallback}>
      <Typography variant='h5' component='h5'>
        Новая опция селектора
      </Typography>
      <Formik
        initialValues={select.optionValues}
        onSubmit={formik.handleSubmit}>
        <Form>
          <Stack direction='column' spacing={1}>
            {Object.keys(formik.values).map((fieldName) => {
              const labels = {
                title: 'Наименование',
                value: 'Значение',
              };
              return (
                <TextField
                  name={fieldName}
                  label={labels[fieldName]}
                  value={formik.values[fieldName]}
                  onChange={formik.handleChange}
                  variant='standard'
                />
              );
            })}
          </Stack>
          <Stack direction='row' spacing={2}>
            <ActionButtons
              disableCondition={!formik.values.title || !formik.values.value}
              abortCallback={abortCallback}
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
