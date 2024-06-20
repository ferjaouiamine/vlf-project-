/* eslint-disable */
// component
import { lte } from 'lodash';
import { getCurrentUser } from 'src/services/user/current-user';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
let navConfigLandingPage;

navConfigLandingPage = [
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
    title: 'home',
    path: '/',
  },
  // {
  //   title: 'Consultants',
  //   path: '/consultants',
  //   icon: getIcon('carbon:cloud-service-management'),
  // },
  {
    title: 'navbarItem',
    path: '/navbaritem1',
  },
  {
    title: 'navbarItem',
    path: '/navbaritem2',
  },
  {
    title: 'navbarItem',
    path: '/navbaritem3',
  },
  // {
  //   title: 'Users management',
  //   path: '/dashboard/user',
  //   icon: getIcon('mdi:users-outline'),
  // },
  // {
  //   title: 'Training management',
  //   path: '/dashboard/trainingPackageManagement',
  //   icon: getIcon('carbon:cloud-service-management'),
  // },
];

export default navConfigLandingPage;
