import React, { useState } from 'react';
import { useFormik } from 'formik';

export const useNewForm = () => {
  let [fields, updateFields] = useState([]);
  const formik = useFormik({
    initialValues: {
      form: {
        name: 'Новая форма',
        description: 'Описание новой формы',
      },
    },
    onSubmit: (values) => console.log(values),
  });
  return { fields, updateFields, formik };
};
