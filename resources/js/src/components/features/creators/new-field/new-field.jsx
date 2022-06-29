import React, { useId, forwardRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useFormik } from 'formik';

import { form } from '@global-states';
import { fieldValidationSchema, newForm } from '@domains';
import { useSelectOptionsHandler } from '@hooks';
import { fieldValues, fieldFormStructure, fieldTypes } from '@constants';

import styles from './new-field.module.scss';
import {
  CreatorModal,
  OptionsList,
  LabledSwitch,
  ValidatedField,
} from '@components/reusable';
import {
  MenuItem,
  TextField,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

const NewFieldCreator = observer(
  forwardRef((props, creatorRef) => {
    const { optionsState, handlers } = useSelectOptionsHandler();
    const formik = useFormik({
      initialValues: fieldValues,
      validationSchema: fieldValidationSchema,
      onSubmit: (eventValues, helpers) => {
        form.createField({ ...eventValues, selectOptions: optionsState.list });
        creatorRef.current.close();
        helpers.resetForm();
      },
    });
    const formData = {
      initialValues: fieldValues,
      formikInstance: formik,
    };
    const disableCondition =
      formik.values.type === 'select' && optionsState.list.length === 0;
    return (
      <CreatorModal
        creatingThing='field'
        ref={creatorRef}
        form={formData}
        submitIsDisable={disableCondition}
        title='Новое поле'>
        {fieldFormStructure.map((field) => {
          const components = {
            name: EditorTextField,
            description: EditorTextField,
            type: EditorSelect,
          };
          const id = useId();
          const CurrentComponent = components[field.name];
          return (
            <ValidatedField name={field.name} formikInstance={formik}>
              <CurrentComponent key={id} field={field} formik={formik} />
            </ValidatedField>
          );
        })}
        {formik.values.type === 'select' && (
          <OptionsList
            scrollbarColor='blue'
            list={optionsState.list}
            handlers={handlers}
          />
        )}
        <div className={styles['new-field-editor__switch']}>
          <LabledSwitch
            label='Обязательное поле'
            name='isRequired'
            changeHandler={formik.handleChange}
          />
        </div>
      </CreatorModal>
    );
  }),
);

const EditorSelect = ({ formik, field }) => {
  const { name, label } = field;
  return (
    <FormControl fullWidth>
      <InputLabel color='secondary'>{label}</InputLabel>
      <Select
        id={`new-field-editor__field_${name}`}
        error={newForm.hasError(name, formik)}
        color='secondary'
        label={label}
        name={name}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values[name]}>
        {fieldTypes.map((type) => {
          const { title, value } = type;
          return (
            <MenuItem value={value} key={value}>
              {title}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const EditorTextField = ({ formik, field }) => {
  const { values, handleBlur, handleChange } = formik;
  const { name, label } = field;
  return (
    <TextField
      error={newForm.hasError(name, formik)}
      id={`new-field-editor__field_${name}`}
      name={name}
      label={label}
      value={values[name]}
      color='secondary'
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
};

export { NewFieldCreator };
