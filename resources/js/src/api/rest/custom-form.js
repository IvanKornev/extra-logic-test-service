import axios from 'axios';
import { options } from '@api/config';

const url = `${options.baseUrl}/custom-form`;

export const saveForm = async (values) => {
  await axios.post(url, values);
};
