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
  display: 'inline-flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const editingOption = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: '8px',
  },
  fields: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '4px',
  },
  value: {
    width: '80%',
    '& input[type="text"]': {
      fontSize: '14px',
    },
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: '6px', 
  }
};

export const styles = {
  list,
  option,
  editingOption,
};
