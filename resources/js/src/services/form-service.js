import axios from 'axios';

const save = (values) =>
  axios.post('http://localhost:8000/custom-form', values);

export const formService = { save };
