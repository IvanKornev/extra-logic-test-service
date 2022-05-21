import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Formik, Form, useFormik } from 'formik';
import { Box, Typography, Stack, Modal } from '@mui/material';

import { Fields, ActionButtons, SelectOptions } from './blocks';
import { fieldEditor } from '../../domains';
import { styles } from './field-editor.styles';

const FieldEditor = props => {
  const [selectOptions, setSelectOptions] = useState([]);
  const formik = useFormik({
    initialValues: fieldEditor.defaultValues,
    onSubmit: eventValues => fieldEditor.create({
      ...eventValues, selectOptions,
    }),
  });
  const { abortCallback, wasOpened } = props;

  useEffect(() => {
    if (formik.values.type !== 'select') {
      setSelectOptions([]);
    }
  }, [formik.values.type]);

  return(
    <Modal open={ wasOpened } onClose={ abortCallback } sx={ styles.modal }>
      <Box component="section" sx={ styles.box }>
        <Typography variant="h5" component="h5">
          Новое поле
        </Typography>
        <Formik onSubmit={ formik.handleSubmit }>
          <Form>
            <Stack direction="column" spacing={ 2 }>
              <Fields formikInstance={ formik } />
              { formik.values.type === 'select' && (
                <SelectOptions
                  options={ selectOptions }
                  setOptions={ setSelectOptions }
                />
              )}
            </Stack>
            <Stack direction="row" spacing={2}>
              <ActionButtons
                optionsCount ={ selectOptions.length }
                fieldType={ formik.values.type }
                abortCallback={ abortCallback }
              />
            </Stack>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
};

FieldEditor.propTypes = {
  wasOpened: PropTypes.bool.isRequired,
  abortCallback: PropTypes.func.isRequired,
};

export { FieldEditor };
