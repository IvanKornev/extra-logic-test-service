const fieldsContainer = {
  display: 'flex',
  flexDirection: 'column',
};

const singleField = {
  display: 'inline-flex',
  flexDirection: 'row',
  rowGap: '4px',
  margin: '8px 0',
};

const wrapper = {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '10px',
};

const heading = {
  fontSize: '15px',
};

const field = {
  '& input[type="text"]': {
    fontSize: '14px',
  },
};

const select = {
  fontSize: '15px',
};

const name = {
  '& input[type="text"]': {
    fontSize: '30px',
  },
};

const description = {
  '& input[type="text"]': {
    fontSize: '16px',
  },
};

export const styles = {
  fieldsContainer,
  singleField,
  wrapper,
  heading,
  field,
  select,
  titleFields: {
    name,
    description,
  },
};
