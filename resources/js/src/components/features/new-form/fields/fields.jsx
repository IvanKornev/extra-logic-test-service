import React, { useId } from 'react';
import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import generateId from 'uniqid';

import { FieldBox, OptionsList, RequiredFieldMark } from '@components/reusable';
import { Typography, Stack, TextField } from '@mui/material';

import { saveForm } from '@api';
import { wasSelected } from '@domains';
import { formFields, formValues } from '@constants';
import { form } from '@global-states';
import { styles } from './fields.styles';

const NewFormFields = observer((props) => {
  const { fields, selectedFieldComponent, menuComponent } = props;
  const currentId = form.selectedField?.uniqueId;
  const formik = useFormik({
    initialValues: formValues,
    onSubmit: async (form) => {
      await formService.save({ ...form });
    },
  });
  return (
    <div style={styles.fieldsContainer}>
      <div style={styles.singleField}>
        <FieldBox onClick={() => form.selectField(null)} withBorder>
          {Object.keys(formik.values).map((field) => {
            const id = useId();
            return (
              <TextField
                key={id}
                name={field}
                color='secondary'
                variant='standard'
                value={formik.values[field]}
                onChange={formik.handleChange}
                sx={styles.titleFields[field]}
              />
            );
          })}
        </FieldBox>
        {!form.selectedField && menuComponent}
      </div>
      {fields.length !== 0 &&
        fields.map((field) => (
          <div style={styles.singleField}>
            <FieldBox
              onClick={() => form.selectField(field)}
              key={field.uniqueId}>
              <div style={styles.wrapper}>
                {!wasSelected(field.uniqueId, currentId) && (
                  <>
                    {formFields.map((name) => (
                      <Stack direction='row'>
                        <Typography
                          key={generateId()}
                          component='h3'
                          variant='h6'
                          sx={styles.heading}>
                          {field[name]}
                        </Typography>
                        {field.isRequired && name === 'name' && (
                          <RequiredFieldMark />
                        )}
                      </Stack>
                    ))}
                    {field.type === 'select' && (
                      <OptionsList list={field.selectOptions} />
                    )}
                  </>
                )}
                {wasSelected(field.uniqueId, currentId) &&
                  selectedFieldComponent}
              </div>
            </FieldBox>
            {wasSelected(field.uniqueId, currentId) && menuComponent}
          </div>
        ))}
    </div>
  );
});

NewFormFields.defaultTypes = {
  fields: [],
};

NewFormFields.propTypes = {
  fields: PropTypes.array.isRequired,
  menuComponent: PropTypes.element.isRequired,
  selectedFieldComponent: PropTypes.element.isRequired,
};

export { NewFormFields };
