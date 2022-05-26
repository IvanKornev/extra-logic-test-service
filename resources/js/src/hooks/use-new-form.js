import React, { useState } from 'react';
import { useFormik } from 'formik';

import { newForm } from '@domains';
import { formService } from '@services';

export const useNewForm = () => {
  let [fields, updateFields] = useState([]);
  const formik = useFormik({
    initialValues: newForm.defaultValues,
    onSubmit: async (form) => {
      await formService.save({ ...form, fields });
    },
  });
  return { fields, updateFields, formik };
};
