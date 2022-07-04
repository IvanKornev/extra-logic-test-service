import * as unicons from '@iconscout/react-unicons';  

export const icons = {
  navbar: {
    Logo: unicons.UilFileAlt,
    ClosedMenu: unicons.UilBars,
    OpenedMenu: unicons.UilTimes,
    CreateFormAction: unicons.UilPlusSquare,
  },
  optionsList: {
    defaultOption: [
      {
        component: unicons.UilPen,
        size: 18,
        action: 'edit',
      },
      {
        component: unicons.UilTrashAlt,
        size: 18,
        action: 'remove',
      },
    ],
    editingOption: [
      {
        component: unicons.UilCheckCircle,
        size: 28,
        color: '#1EE676',
        action: 'confirm-changes',
      },
      {
        component: unicons.UilTimesCircle,
        size: 28,
        color: '#F12323',
        action: 'discard-changes',
      },
    ],
  },
};
