import { useFormik } from 'formik';

import { formState } from '@global-states';
import { initialValues, validationSchemas } from '@constants';

export const useFormBuilder =
  (formName) =>
  (...formParams) => {
    switch (formName) {
      case 'new-option':
        return getNewOptionForm(formParams);
      case 'editing-option':
        return getEditingOptionForm(formParams);
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
        onSubmit: (values, helpers) => {
          formState.changeTitleField(values);
          const formNextState = { values };
          helpers.resetForm(formNextState);
        },
      };
      const fieldValues = initialValues.titleField;
      const builtForm = buildForm(fieldValues, callbacks, 'titleField');
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
      const builtForm = buildForm(selectedField, callbacks, 'defaultField');
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
      const form = buildForm(fieldValues, callbacks, 'defaultField');
      return form;
    }

    function getEditingOptionForm(params) {
      const [handlers, creatorRef, previousValue] = params;
      const callbacks = {
        onSubmit: (values, helpers) => {
          handlers.edit(values);
          creatorRef.current.close();
          helpers.resetForm({ values });
        },
      };
      const optionValues = previousValue;
      const form = buildForm(optionValues, callbacks, 'option');
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
      const optionValues = initialValues.newOption;
      const form = buildForm(optionValues, callbacks, 'option');
      return form;
    }

    function buildForm(values, callbacks = [], type = 'defaultField') {
      const validationSchema = validationSchemas[type];
      const builtForm = useFormik({
        initialValues: values,
        validationSchema,
        ...callbacks,
      });
      return builtForm;
    }
  };
