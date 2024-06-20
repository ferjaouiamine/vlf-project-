/* eslint-disable */
// component
import { lte } from 'lodash';
import { getCurrentUser } from 'src/services/user/current-user';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
let navConfigConsultant;

navConfigConsultant = [
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
    title: 'Consultants',
    path: '/dashboard/consultants',
    icon: getIcon('carbon:cloud-service-management'),
  },
  {
    title: 'My meetings',
    path: '/dashboard/consultantMeetings',
    icon: getIcon('guidance:meeting-room'),
  },
  {
    title: 'E-learning Blog',
    path: '/dashboard/BlogPage',
    icon: getIcon('material-symbols:dashboard-customize'),
  },

  // {
  //   title: 'My training',
  //   path: '/dashboard/myTraining',
  //   icon: getIcon('fluent:learning-app-24-filled'),
  // },
];

export default navConfigConsultant;
