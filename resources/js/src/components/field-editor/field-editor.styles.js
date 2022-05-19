const box = {
  p: 2,
  background: 'rgba(0, 0, 0, 0.7)',
  borderRadius: '3px',
  display: 'inline-flex',
  flexDirection: 'column',
  color: 'white',
};

const field = {
  borderBottom: '1px solid white',
  '& label, input': {
    color: 'white',
  },
};

export const styles = {
  box, field,
};
