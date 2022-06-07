import React, { useId, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import generateId from 'uniqid';
import { MenuItem } from '@mui/material';

import { observer } from 'mobx-react-lite';
import { form } from '@global-states';
import { useFormik } from 'formik';

import {
  EditorModal,
  OptionsHandler,
  LabledSwitch,
} from '@components/reusable';
import { NewOptionEditor } from '@components/features/editor';
import { select } from '@domains';
import { fieldValues, fieldFormStructure } from '@constants';

import { styles } from './new-field.styles';

const NewFieldEditor = observer((props) => {
  const { abortCallback, wasOpened } = props;
  const [editorWasOpened, openEditor] = useState(false);
  const [selectOptions, setSelectOptions] = useState([]);

  const formik = useFormik({
    initialValues: fieldValues,
    onSubmit: (eventValues) => {
      form.createField({ ...eventValues, selectOptions });
      abortCallback();
    },
  });

  useEffect(() => {
    if (formik.values.type !== 'select') {
      setSelectOptions([]);
    }
  }, [formik.values.type]);

  const formData = {
    initialValues: fieldValues,
    formikInstance: formik,
  };
  return (
    <EditorModal
      abortCallback={abortCallback}
      form={formData}
      isVisible={wasOpened}
      disableCondition={
        formik.values.type === 'select' && selectOptions.length === 0
      }
      title='Новое поле'>
      <EditorFields formikInstance={formik} />
      {formik.values.type === 'select' && (
        <OptionsHandler
          options={selectOptions}
          setOptions={setSelectOptions}
          editorWasOpened={editorWasOpened}
          openEditor={openEditor}
          editorComponent={
            <NewOptionEditor
              abortCallback={() => openEditor(false)}
              isVisible={editorWasOpened}
              setOptions={setSelectOptions}
            />
          }
        />
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
          id={name}
          name={name}
          label={label}
          value={formikInstance.values[name]}
          variant='standard'
          color='primary'
          onChange={formikInstance.handleChange}>
          {select.isSelect(component) &&
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
