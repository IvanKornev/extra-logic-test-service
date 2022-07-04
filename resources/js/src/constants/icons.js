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
        action: 'edit',
        params: {
          size: 18,
        },
      },
      {
        component: unicons.UilTrashAlt,
        action: 'remove',
        params: {
          size: 18,
        },
      },
    ],
    editingOption: [
      {
        component: unicons.UilCheckCircle,
        action: 'confirm-changes',
        params: {
          size: 28,
          color: '#1EE676',
        },
      },
      {
        component: unicons.UilTimesCircle,
        action: 'discard-changes',
        params: {
          size: 28,
          color: '#F12323',
        },
      },
    ],
  },
};
