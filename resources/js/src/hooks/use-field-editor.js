import { useState, useEffect } from 'react';
import { useFormik } from 'formik';

import { fieldEditor } from '@domains';
import { fieldValues } from '@constants';

const useFieldEditor = (updateCallback, abortCallback) => {
  const [selectOptions, setSelectOptions] = useState([]);
  const formik = useFormik({
    initialValues: fieldValues,
    onSubmit: (eventValues) => {
      const createdField = fieldEditor.create({
        ...eventValues,
        selectOptions,
      });
      updateCallback((list) => list.insert(createdField));
      abortCallback();
    },
  });

  useEffect(() => {
    if (formik.values.type !== 'select') {
      setSelectOptions([]);
    }
  }, [formik.values.type]);

  return { setSelectOptions, selectOptions, formik };
};

export { useFieldEditor };
