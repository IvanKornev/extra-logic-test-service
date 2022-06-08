import makeRequest from '@api/make-request';

const urlPrefix = '/custom-form';

export const saveForm = async (values) => {
  const params = {
    method: 'POST',
    data: values,
  };
  console.log(values);
  await makeRequest(urlPrefix, params);
};
