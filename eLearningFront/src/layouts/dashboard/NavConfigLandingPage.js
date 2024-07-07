/* eslint-disable */
// component
import { lte } from 'lodash';
import { getCurrentUser } from 'src/services/user/current-user';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
let navConfigLandingPage;

navConfigLandingPage = [
  {
    title: 'home',
    path: '/',
  },
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
  }
];

export default navConfigLandingPage;
