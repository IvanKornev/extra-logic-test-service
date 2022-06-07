import { useFormik } from 'formik';
import { formValues } from '@constants';
import { formService } from '@services';

export const useNewForm = () => {
  const formik = useFormik({
    initialValues: formValues,
    onSubmit: async (form) => {
      await formService.save({ ...form });
    },
  });
  return { formik };
};
