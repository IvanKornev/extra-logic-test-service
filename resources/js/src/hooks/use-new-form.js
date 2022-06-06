import { useState, useEffect } from 'react';
import { useFormik } from 'formik';

import { formValues } from '@constants';
import { LinkedList } from '@data-structures';
import { formService } from '@services';

export const useNewForm = () => {
  const [fields, updateFields] = useState(new LinkedList());
  const formik = useFormik({
    initialValues: formValues,
    onSubmit: async (form) => {
      await formService.save({ ...form, fields });
    },
  });

  return { fields, updateFields, formik };
};
