const name = {
  fontSize: '15px',
};

const descriptionHeading = {
  fontSize: '14px',
  color: '#333',
  opacity: '0.8',
};

const descriptionField = {
  '& input[type="text"]': {
    fontSize: '14px',
  },
};

export const styles = {
  headings: {
    name,
    description: descriptionHeading,
  },
  fields: {
    description: descriptionField,
  },
};
