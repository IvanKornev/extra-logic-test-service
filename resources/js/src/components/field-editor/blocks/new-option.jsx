import React from 'react';
import { TextField, Typography, Stack } from '@mui/material';
import { Form, Formik, useFormik } from 'formik';

import { Modal } from '../../../ui-core';
import { select, selectOption } from '../../../domains';
import { ActionButtons } from '.';

const NewOption = ({ isVisible, abortCallback }) => {
  const formik = useFormik({
    initialValues: selectOption.defaultValues,
    onSubmit: (values) => (
      alert(JSON.stringify(values))
    )
  });
  return(
    <Modal open={ isVisible } onClose={ abortCallback }>
      <Typography variant="h5" component="h5">
        Новая опция селектора
      </Typography>
      <Formik initialValues={ selectOption.defaultValues } onSubmit={ formik.handleSubmit }>
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

export { NewOption };
