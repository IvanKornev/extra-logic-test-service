import React, { useId, useState } from 'react';
import PropTypes from 'prop-types';
import generateId from 'uniqid';
import { MenuItem } from '@mui/material';

import { EditorModal, OptionsHandler, LabledSwitch } from '@components/reusable';
import { NewOptionEditor } from '@components/features/editor';
import { useFieldEditor } from '@hooks';
import { select } from '@domains';
import { fieldValues, fieldFormStructure } from '@constants';

import { styles } from './new-field.styles';

const NewFieldEditor = (props) => {
  const { abortCallback, wasOpened, updateFields } = props;
  const [editorWasOpened, openEditor] = useState(false);
  let { setSelectOptions, selectOptions, formik } = useFieldEditor(
    updateFields,
    abortCallback,
  );
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
};

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
  updateFields: PropTypes.func.isRequired,
  abortCallback: PropTypes.func.isRequired,
};

export { NewFieldEditor };
