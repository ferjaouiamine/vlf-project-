/* eslint-disable */
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from 'src/pages/Footer/Footer';
// material
import { styled } from '@mui/material/styles';
//
import useResponsive from '../../hooks/useResponsive';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  // backgroundColor: '',
  // background: 'rgb(254,240,253)',
  background: 'linear-gradient(90deg, rgba(254,240,253,1) 35%, rgba(246,246,252,1) 60%, rgba(209,226,253,1) 100%)',
  paddingTop: APP_BAR_MOBILE + 24,
  // paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const isDesktop = useResponsive('up', 'lg');

  return (
    <RootStyle>
      {<DashboardNavbar onOpenSidebar={() => setOpen(true)} />}
      {!isDesktop && <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />}
      <MainStyle>
        <Outlet />
        <Footer />
      </MainStyle>
    </RootStyle>
  );
}
