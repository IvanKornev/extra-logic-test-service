import React, { useId, forwardRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useFormik } from 'formik';

import { form } from '@global-states';
import { fieldValidationSchema, newForm, isSelect } from '@domains';
import { useSelectOptionsHandler } from '@hooks';
import { fieldValues, fieldFormStructure } from '@constants';

import styles from './new-field.module.scss';
import { MenuItem, FormControl, InputLabel } from '@mui/material';
import {
  CreatorModal,
  OptionsList,
  LabledSwitch,
  ValidatedField,
} from '@components/reusable';

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
          const id = useId();
          return (
            <ValidatedField key={id} name={field.name} formikInstance={formik}>
              <EditorField field={field} formik={formik} />
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

const EditorField = ({ formik, field }) => {
  const { values, handleBlur, handleChange } = formik;
  const { name, label, component } = field;
  const CurrentComponent = component.name;
  return (
    <FormControl fullWidth>
      {field.name === 'type' && (
        <InputLabel color='secondary'>{label}</InputLabel>
      )}
      <CurrentComponent
        error={newForm.hasError(name, formik)}
        id={`new-field-editor__field_${name}`}
        name={name}
        label={label}
        value={values[name]}
        color='secondary'
        onBlur={handleBlur}
        onChange={handleChange}>
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
    </FormControl>
  );
};

export { NewFieldCreator };
