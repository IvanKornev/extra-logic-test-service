const box = {
  p: 2,
  background: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '6px',
  display: 'inline-flex',
  flexDirection: 'column',
  color: 'black',
};

const modal = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const optionsList = {
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
  }
};

const optionItem = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
};

export const styles = {
  box, modal, optionsList, optionItem,
};
