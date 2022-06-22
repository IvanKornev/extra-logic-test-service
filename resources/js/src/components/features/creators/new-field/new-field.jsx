import React, { useId, forwardRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useFormik } from 'formik';

import { form } from '@global-states';
import { isSelect } from '@domains';
import { useSelectOptionsHandler } from '@hooks';
import { fieldValues, fieldFormStructure } from '@constants';

import { MenuItem } from '@mui/material';
import { CreatorModal, OptionsList, LabledSwitch } from '@components/reusable';
import styles from './new-field.module.scss';

const NewFieldCreator = observer(
  forwardRef((props, creatorRef) => {
    const { optionsState, handlers } = useSelectOptionsHandler();
    const formik = useFormik({
      initialValues: fieldValues,
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
            component.options.map((option, index) => (
              <MenuItem
                key={useId()}
                id={`new-field-editor__option_${index + 1}`}
                value={option.value}>
                {option.title}
              </MenuItem>
            ))}
        </CurrentComponent>
      );
    })}
  </>
);

export { NewFieldCreator };
