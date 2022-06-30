import { useFormik } from 'formik';

import { form as formState } from '@global-states';
import { validationSchemas } from '@validation-schemas';
import { optionValues, initialValues } from '@constants';

export const useFormBuilder =
  (formName) =>
  (...formParams) => {
    switch (formName) {
      case 'new-option':
        return getNewOptionForm(formParams);
      case 'new-field':
        return getNewFieldForm(formParams);
      case 'editing-field':
        return getEditingFieldForm(formParams);
      case 'title-field':
        return getTitleFieldForm();
      default:
        throw new Error('Шаблона для построения не обнаружено');
    }

    function getTitleFieldForm() {
      const callbacks = {
        onBlur: (values) => formState.changeTitleField(values),
      };
      const fieldValues = initialValues.titleField;
      const builtForm = buildForm(fieldValues, callbacks);
      return builtForm;
    }

    function getEditingFieldForm(params) {
      const [selectOptions] = params;
      const { selectedField } = formState;
      const callbacks = {
        onSubmit: (values) => {
          const data = { ...values, selectOptions };
          formState.changeField(selectedField.uniqueId, data);
        },
      };
      const builtForm = buildForm(selectedField, callbacks);
      return builtForm;
    }

    function getNewFieldForm(params) {
      const [creatorRef, selectOptions] = params;
      const callbacks = {
        onSubmit: (values, helpers) => {
          formState.createField({ ...values, selectOptions });
          creatorRef.current.close();
          helpers.resetForm();
        },
      };
      const fieldValues = initialValues.newField;
      const form = buildForm(fieldValues, callbacks);
      return form;
    }

    function getNewOptionForm(params) {
      const [handlers, creatorRef] = params;
      const callbacks = {
        onSubmit: (values) => {
          handlers.add(values);
          creatorRef.current.close();
        },
      };
      const form = buildForm(optionValues, callbacks, 'option');
      return form;
    }

    function buildForm(values, callbacks = [], type = 'field') {
      const validationSchema = validationSchemas[type];
      const builtForm = useFormik({
        initialValues: values,
        validationSchema,
        ...callbacks,
      });
      return builtForm;
    }
  };
