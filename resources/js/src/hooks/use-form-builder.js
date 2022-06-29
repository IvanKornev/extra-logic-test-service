import { useFormik } from 'formik';

import { form } from '@global-states';
import { optionValidationSchema, fieldValidationSchema } from '@domains';
import { optionValues, formValues, fieldValues } from '@constants';

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
        onBlur: (values) => form.changeTitleField(values),
      };
      const builtForm = buildFieldForm(formValues, callbacks);
      return builtForm;
    }

    function getEditingFieldForm(params) {
      const [selectOptions] = params;
      const callbacks = {
        onSubmit: (values) => {
          const data = { ...values, selectOptions };
          form.changeField(form.selectedField.uniqueId, data);
        },
      };
      const builtForm = buildFieldForm(form.selectedField, callbacks);
      return builtForm;
    }

    function getNewFieldForm(params) {
      const [creatorRef, selectOptions] = params;
      const callbacks = {
        onSubmit: (values, helpers) => {
          form.createField({ ...values, selectOptions });
          creatorRef.current.close();
          helpers.resetForm();
        },
      };
      const builtForm = buildFieldForm(fieldValues, callbacks);
      return builtForm;
    }

    function getNewOptionForm(params) {
      const [handlers, creatorRef] = params;
      const builtForm = buildNewOptionForm(handlers, creatorRef);
      return builtForm;
    }

    function buildFieldForm(initialValues, callbacks = []) {
      const builtForm = useFormik({
        initialValues,
        validationSchema: fieldValidationSchema,
        ...callbacks,
      });
      return builtForm;
    }

    function buildNewOptionForm(handlers, modalRef) {
      const submitCallback = (values) => {
        handlers.add(values);
        modalRef.current.close();
      };
      const builtForm = useFormik({
        initialValues: optionValues,
        validationSchema: optionValidationSchema,
        onSubmit: (values) => submitCallback(values),
      });
      return builtForm;
    }
  };
