const list = {
  display: 'flex',
  flexDirection: 'column',
  height: '100px',
  overflowX: 'hidden',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '6px',
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '10px',
    backgroundColor: '#1976d2',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.2)',
    borderRadius: '10px',
    backgroundColor: 'transparent',
  },
};

const option = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const editingOption = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  columnGap: '8px',
};

export const styles = {
  list,
  option,
  editingOption,
};
