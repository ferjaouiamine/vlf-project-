/* eslint-disable */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './Calendar.css';
import { addDays } from 'date-fns';
// mock
import account from '../../_mock/account';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
//
import navConfig from './NavConfig';
import { getCurrentUser } from 'src/services/user/current-user';
import navConfigAdmin from './NavConfigAdmin';
import NavConfigClient from './NavConfigClient';
import LogoElearning from 'src/components/LogoElearning';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  boxShadow: 'rgb(22 31 39 / 42%) 0px 60px 123px -25px, rgb(19 26 32 / 8%) 0px 35px 75px -35px',
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');
  const [dateState, setDateState] = useState(new Date())

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    setInterval(() => setDateState(new Date()), 30000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
      disabled:true
    }
  ])

  const renderContent = (
    <Scrollbar
      sx={{
        // height: '80%',
        // backgroundColor:'#fff',
        // marginTop:'0%',
        // boxShadow: 'rgb(22 31 39 / 42%) 0px 60px 123px -25px, rgb(19 26 32 / 8%) 0px 35px 75px -35px',
        // borderRadius: '10px',
        // border: '1px solid',
        borderColor: 'rgb(226 220 213) rgb(226 223 213) rgb(204 198 184)',
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <LogoElearning location='sidebar' />
      </Box>
      <NavSection navConfig={ getCurrentUser().role === 'client' ? NavConfigClient : navConfigAdmin } />
      {/* <NavSection navConfig={getCurrentUser().role === 'admin' ? navConfigAdmin : navConfig} /> */}

      <Box sx={{ flexGrow: 1 }} />
      {/* <Calendar
            date={ new Date() }
            style={{backgroundColor:'#e3e4e6', display:'contents'}}
            showMonthAndYearPickers={false}
            color='#FF4842'
            className='calendar'
          /> */}
          {/* <div style={{textAlign: 'center', position:'fixed', bottom:'3%', left:'4%',fontSize:'x-large', fontWeight:'bold', color:'#2F95CA'}}>
            {dateState.getDate()}/{dateState.getMonth() + 1}/{dateState.getFullYear()}
            <br />
            {dateState.getHours()} : {dateState.getMinutes()}
          </div> */}

    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              // borderRightStyle: 'dashed',
              backgroundColor:'#066466',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
