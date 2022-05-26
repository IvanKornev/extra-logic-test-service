const box = {
  display: 'inline-flex',
  background: 'white',
  flexDirection: 'column',
  padding: '14px',
  borderRadius: '8px',
  border: '1px rgba(0, 0, 0, 0.2) solid',
};

const borderedBox = {
  ...box,
  borderTop: '8px rgb(103, 58, 183) solid',
  boxShadow: `0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 
    0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%)`,
};

export const styles = {
  box,
  borderedBox,
};
