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
import { Link } from '@mui/material';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import NavSectionLandingPage from 'src/components/NavSectionLandingPage';
import { useNavigate } from 'react-router-dom';
import navConfigLandingPage from './NavConfigLandingPage';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme, pageID }) => ({
  // boxShadow: 'none',
  backdropFilter: 'none',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  // backgroundColor: alpha(theme.palette.background.default, 0.72),
  backgroundColor: '#ffffff00',

  // opacity: 0.5,
  boxShadow: 'none',
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
  marginTop: '1.6%',
  marginLeft: '3%',
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbarLandingPage.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbarLandingPage({ onOpenSidebar }) {
  const isDesktop = useResponsive('up', 'lg');
  const navigate = useNavigate();
  const url = window.location.href;
  const pageID = url.substring(url.lastIndexOf('/') + 1);
  const [landingPage, setLandingPage] = useState(true);
  {
  }

  return (
    <RootStyle pageID>
      <ToolbarStyle>
        <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        {isDesktop && <LogoElearning location="navBar" />}
        {/* <Searchbar /> */}
        <Box sx={{ flexGrow: 2 }} />
        <Stack direction="row" spacing={{ xs: 2, sm: 2 }}></Stack>
        {isDesktop && (
          <NavSectionLandingPage
            landingPage={landingPage}
            navConfig={
              getCurrentUser().role === 'client' ? NavConfigClient : 'admin' ? navConfigAdmin : navConfigLandingPage
            }
          />
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          {/* <LanguagePopover /> */}
          {/* <AccountPopover /> */}
          <Link
            onClick={(e) => navigate('/login')}
            rel="noopener noreferrer"
            style={{ marginRight: '1rem', marginLeft: '4rem', cursor: 'pointer', marginTop: '0.3rem' }}
          >
            <div style={{ color: '#86B4FF', display: 'inline-flex' }}>
              {' '}
              <img
                src={process.env.PUBLIC_URL + 'favicon/LoginIconD2.png'}
                style={{ backgroundcolor: '#86B4FF', marginRight: '15%' }}
                alt=""
              />
              <span
                style={{
                  color: '#86B4FF',
                  marginTop: '1%',
                  fontWeight: '300',
                  fontFamily: 'sans-serif',
                  fontSize: '15px',
                }}
              >
                Login
              </span>
            </div>
          </Link>
          <Link
            onClick={(e) => navigate('/register')}
            rel="noopener noreferrer"
            style={{ cursor: 'pointer', textDecoration: 'none' }}
          >
            <div
              style={{
                color: '#white',
                backgroundColor: '#86B4FF',
                borderRadius: '10px',
                width: '105px',
                paddingTop: '5%',
                paddingLeft: '26%',
                height: '38px',
              }}
            >
              {' '}
              <span
                style={{
                  color: '#fff',
                  fontWeight: '500',
                  fontFamily: 'sans-serif',
                  fontSize: '15px',
                  lineHeight: '20px',
                }}
              >
                Join Us
              </span>
            </div>
          </Link>
          {/* <LogoutButton /> */}
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
