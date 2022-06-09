const wrapper = {
  display: 'inline-flex',
  flexDirection: 'row',
  rowGap: '4px',
  margin: '8px 0',
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
  fields: {
    name,
    description,
  },
};
