/* eslint-disable */
import PropTypes from 'prop-types';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
// components

import Iconify from '../../components/Iconify';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import LogoutButton from './LogoutButton';
import NavSection from 'src/components/NavSection';
import { getCurrentUser } from 'src/services/user/current-user';
import NavConfigClient from './NavConfigClient';
import navConfigAdmin from './NavConfigAdmin';
import LogoElearning from 'src/components/LogoElearning';
import useResponsive from 'src/hooks/useResponsive';
import navConfigConsultant from './NavConfigConsultant';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  // boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  // backgroundColor: alpha(theme.palette.background.default, 0.72),
  backgroundColor: '#fff',

  // opacity: 0.5,
  boxShadow: 'rgba(47, 149, 202, 0.16) 0px 60px 123px -25px, rgb(19 26 32 / 8%) 0px 35px 75px -35px',
  // boxShadow: 'rgb(22 31 39 / 42%) 0px 60px 123px -25px, rgb(19 26 32 / 8%) 0px 35px 75px -35px',
  // borderRadius: '10px',
  // borderBottomLeftRadius: '10%',
  // borderBottomRightRadius: '10%',
  // border: '1px solid',
  // borderColor: 'rgb(226 220 213) rgb(226 223 213) rgb(204 198 184)',
  [theme.breakpoints.up('lg')]: {
    // width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
    width: '100%',
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar, landingPage }) {
  const isDesktop = useResponsive('up', 'lg');

  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        {isDesktop && <LogoElearning location="navBar" />}
        {/* <Searchbar /> */}
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={{ xs: 2, sm: 2 }}></Stack>
        {isDesktop && (
          <NavSection
            navConfig={
              getCurrentUser().role === 'client'
                ? NavConfigClient
                : getCurrentUser().role === 'consultant'
                ? navConfigConsultant
                : navConfigAdmin
            }
          />
        )}{' '}
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          {/* <LanguagePopover /> */}
          <AccountPopover />
          {/* <LogoutButton /> */}
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
