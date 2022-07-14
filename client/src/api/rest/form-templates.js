import makeRequest from '@api/make-request';

const urlPrefix = '/form-templates';

export const getAllFormTemplates = async () => {
  const params = {
    method: 'GET',
  };
  const data = await makeRequest(urlPrefix, params).then(
    (results) => results.status === 201 && results.data,
  );
  return data.templatesList;
};
