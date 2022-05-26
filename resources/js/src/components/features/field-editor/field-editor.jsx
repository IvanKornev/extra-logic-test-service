import React from 'react';
import PropTypes from 'prop-types';

import { Formik, Form } from 'formik';
import { Typography, Stack } from '@mui/material';

import { Modal, ActionButtons } from '@components/reusable';
import { fieldEditor } from '@domains';
import { useFieldEditor } from '@hooks';

import { Fields, SelectOptions } from './blocks';

const FieldEditor = (props) => {
  const { abortCallback, wasOpened, updateFields } = props;
  let { setSelectOptions, selectOptions, formik } = useFieldEditor(
    updateFields,
    abortCallback,
  );
  return (
    <Modal open={wasOpened} onClose={abortCallback}>
      <Typography variant='h5' component='h5'>
        Новое поле
      </Typography>
      <Formik
        initialValues={fieldEditor.defaultValues}
        onSubmit={formik.handleSubmit}>
        <Form>
          <Stack direction='column' spacing={2}>
            <Fields formikInstance={formik} />
            {formik.values.type === 'select' && (
              <SelectOptions
                options={selectOptions}
                setOptions={setSelectOptions}
              />
            )}
          </Stack>
          <Stack direction='row' spacing={2}>
            <ActionButtons
              disableCondition={
                formik.values.type === 'select' && selectOptions.length === 0
              }
              abortCallback={abortCallback}
            />
          </Stack>
        </Form>
      </Formik>
    </Modal>
  );
};

FieldEditor.propTypes = {
  wasOpened: PropTypes.bool.isRequired,
  updateFields: PropTypes.func.isRequired,
  abortCallback: PropTypes.func.isRequired,
};

export { FieldEditor };
