import axios from 'axios';

const save = async (values) =>
  await axios.post('http://localhost:8000/custom-form', values);

export const formService = { save };
