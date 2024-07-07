/* eslint-disable */
// component
import { lte } from 'lodash';
import { getCurrentUser } from 'src/services/user/current-user';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
let navConfigAdmin;


navConfigAdmin = [
  // {
  //   title: 'Training management',
  //   path: '#',
  //   icon: getIcon('material-symbols:account-tree'),
  //   children: [
  //     {
  //       title: 'Add training',
  //       path: '#',
  //       icon: getIcon('eva:people-fill'),
  //     },
  //     {
  //       title: 'Update training',
  //       path: '#',
  //       icon: getIcon('mdi:warehouse'),
  //     },
  //     {
  //       title: 'Delete training',
  //       path: '#',
  //       icon: getIcon('ooui:articles-rtl'),
  //     },
  //   ],
  // },
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: getIcon('material-symbols:dashboard-customize'),
  },
  {
    title: 'Users management',
    path: '/dashboard/user',
    icon: getIcon('mdi:users-outline'),
  },
  {
    title: 'Meetings management',
    path: '/dashboard/meetings',
    icon: getIcon('guidance:meeting-room'),
  },
  {
    title: 'Training management',
    path: '#',
    icon: getIcon('carbon:cloud-service-management'),
  },
  {
    title: 'My training',
    path: '#',
    icon: getIcon('fluent:learning-app-24-filled'),
  },
  
  
]

export default navConfigAdmin;
