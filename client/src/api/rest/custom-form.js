import makeRequest from '@api/make-request';

const urlPrefix = '/custom-form';

export const getAllForms = async (userId) => {
  const params = {
    method: 'GET',
    data: {
      userId,
    },
  };
  const data = await makeRequest(urlPrefix, params).then(
    (results) => results.status === 201 && results.data,
  );
  return data;
};

export const removeForm = async (formId) => {
  const params = {
    method: 'DELETE',
    data: {
      formId,
    },
  };
  const response = await makeRequest(urlPrefix, params);
  return response;
};

export const saveForm = async (values) => {
  const params = {
    method: 'POST',
    data: values,
  };
  await makeRequest(urlPrefix, params);
};
