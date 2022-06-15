import React, { useId, forwardRef } from 'react';
import PropTypes from 'prop-types';
import generateId from 'uniqid';

import { observer } from 'mobx-react-lite';
import { form } from '@global-states';
import { useFormik } from 'formik';

import { isSelect } from '@domains';
import { useSelectOptionsHandler } from '@hooks';
import { fieldValues, fieldFormStructure } from '@constants';

import { MenuItem } from '@mui/material';
import { CreatorModal, OptionsList, LabledSwitch } from '@components/reusable';
import styles from './new-field.module.scss';

const NewFieldCreator = observer(
  forwardRef((props, creatorRef) => {
    const { optionsList, handlers } = useSelectOptionsHandler();
    const formik = useFormik({
      initialValues: fieldValues,
      onSubmit: (eventValues, helpers) => {
        form.createField({ ...eventValues, selectOptions: optionsList });
        creatorRef.current.close();
        helpers.resetForm();
      },
    });
    const formData = {
      initialValues: fieldValues,
      formikInstance: formik,
    };
    const disableCondition =
      formik.values.type === 'select' && optionsList.length === 0;
    return (
      <CreatorModal
        ref={creatorRef}
        form={formData}
        submitIsDisable={disableCondition}
        title='Новое поле'>
        <EditorFields formikInstance={formik} />
        {formik.values.type === 'select' && (
          <OptionsList list={optionsList} handlers={handlers} />
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
      const { name, label, component } = field;
      const CurrentComponent = component.name;
      const id = useId();
      return (
        <CurrentComponent
          key={id}
          id={`new-field-editor__field_${name}`}
          name={name}
          label={label}
          value={formikInstance.values[name]}
          variant='standard'
          color='primary'
          onChange={formikInstance.handleChange}>
          {isSelect(component) &&
            component.options.map((option) => (
              <MenuItem key={generateId()} value={option.value}>
                {option.title}
              </MenuItem>
            ))}
        </CurrentComponent>
      );
    })}
  </>
);

export { NewFieldCreator };
