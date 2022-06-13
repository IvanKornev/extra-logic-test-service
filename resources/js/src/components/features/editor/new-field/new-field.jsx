import React, { useId } from 'react';
import PropTypes from 'prop-types';
import generateId from 'uniqid';
import { MenuItem } from '@mui/material';

import { observer } from 'mobx-react-lite';
import { form } from '@global-states';
import { useFormik } from 'formik';

import { isSelect } from '@domains';
import { useSelectOptionsHandler } from '@hooks';
import { fieldValues, fieldFormStructure } from '@constants';
import { EditorModal, OptionsList, LabledSwitch } from '@components/reusable';

import { styles } from './new-field.styles';

const NewFieldEditor = observer(({ abortCallback, wasOpened }) => {
  const { optionsList, handlers } = useSelectOptionsHandler();
  const formik = useFormik({
    initialValues: fieldValues,
    onSubmit: (eventValues) => {
      form.createField({ ...eventValues, selectOptions: optionsList });
      abortCallback();
    },
  });
  return (
    <EditorModal
      abortCallback={abortCallback}
      form={{
        initialValues: fieldValues,
        formikInstance: formik,
      }}
      isVisible={wasOpened}
      disableCondition={
        formik.values.type === 'select' && optionsList.length === 0
      }
      title='Новое поле'>
      <EditorFields formikInstance={formik} />
      {formik.values.type === 'select' && (
        <OptionsList list={optionsList} handlers={handlers} />
      )}
      <div style={styles.switchWrapper}>
        <LabledSwitch
          label='Обязательное поле'
          name='isRequired'
          changeHandler={formik.handleChange}
        />
      </div>
    </EditorModal>
  );
});

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

NewFieldEditor.propTypes = {
  wasOpened: PropTypes.bool.isRequired,
  abortCallback: PropTypes.func.isRequired,
};

export { NewFieldEditor };
