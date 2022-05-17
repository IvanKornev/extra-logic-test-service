import axios  from 'axios';

const save = values => {
  console.log(values);
  axios.post('http://localhost:8000/custom-form', values).then((response) => (
    console.log(response.status)
  ));
};

export const formService = { save };