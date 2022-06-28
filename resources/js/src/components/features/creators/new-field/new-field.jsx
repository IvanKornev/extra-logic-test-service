import React, { useId, forwardRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useFormik } from 'formik';

import { form } from '@global-states';
import { isSelect, fieldValidationSchema, newForm } from '@domains';
import { useSelectOptionsHandler } from '@hooks';
import { fieldValues, fieldFormStructure } from '@constants';

import { MenuItem, Alert } from '@mui/material';
import { CreatorModal, OptionsList, LabledSwitch } from '@components/reusable';
import styles from './new-field.module.scss';

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
        <EditorFields formikInstance={formik} />
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

const EditorFields = ({ formikInstance }) => (
  <>
    {fieldFormStructure.map((field) => {
      const { values, handleBlur, handleChange } = formikInstance;
      const { name, label, component } = field;
      const CurrentComponent = component.name;
      const id = useId();
      return (
        <div className={styles['field__wrapper']} key={id}>
          <CurrentComponent
            error={newForm.hasError(name, formikInstance)}
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
          {newForm.hasError(name, formikInstance) && (
            <Alert className={styles['Alert']} severity='error'>
              {formikInstance.errors[name]}
            </Alert>
          )}
        </div>
      );
    })}
  </>
);

export { NewFieldCreator };
