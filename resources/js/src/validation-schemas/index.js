import * as Yup from 'yup';

const field = Yup.object().shape({
  name: Yup.string()
    .max(50, 'Имя не может быть дольше 50 символов')
    .required('Имя - обязательно'),
  description: Yup.string()
    .max(50, 'Описание не может быть дольше 50 символов')
    .required('Описание - обязательно'),
  type: Yup.string()
    .oneOf(['text', 'textarea', 'select'])
    .required('Тип поля выбирается обязательно'),
  isRequired: Yup.boolean(),
});

const option = Yup.object().shape({
  title: Yup.string()
    .max(16, 'Название опции - не дольше 16 символов')
    .min(2, 'Название опции - не меньше 2 символов')
    .required('Название опции - обязательно'),
});

const validationSchemas = { field, option };
export { validationSchemas };
