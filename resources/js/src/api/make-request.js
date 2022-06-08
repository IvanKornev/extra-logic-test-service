import axios from 'axios';
import { baseUrl } from '@api/config';

const makeRequest = async (urlPrefix, params) => {
  isCorrectRequest(urlPrefix, params);
  const url = `${baseUrl}${urlPrefix}`;
  axios({ url, ...params });
};

const isCorrectRequest = (urlPrefix, params) => {
  if (typeof urlPrefix !== 'string' || typeof params !== 'object') {
    const text = `Либо неправильный URL-префикс,
      либо передан некорректный объект параметров`;
    throw new Error(text);
  }
};

export default makeRequest;
