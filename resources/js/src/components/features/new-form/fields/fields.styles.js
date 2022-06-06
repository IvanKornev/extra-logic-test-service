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
  wrapper,
  heading,
  field,
  select,
  titleFields: {
    name,
    description,
  },
};
