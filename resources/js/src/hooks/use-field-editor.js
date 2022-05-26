import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';

import { fieldEditor } from '@domains';

const useFieldEditor = (updateCallback, abortCallback) => {
  const [selectOptions, setSelectOptions] = useState([]);
  const formik = useFormik({
    initialValues: fieldEditor.defaultValues,
    onSubmit: (eventValues) => {
      const createdField = fieldEditor.create({
        ...eventValues,
        selectOptions,
      });
      updateCallback((list) => {
        list.insert(createdField);
        console.log(list);
        return list;
      });
      abortCallback();
    },
  });

  useEffect(() => {
    formik.values.type !== 'select' && setSelectOptions([]);
  }, [formik.values.type]);

  return { setSelectOptions, selectOptions, formik };
};

export { useFieldEditor };
