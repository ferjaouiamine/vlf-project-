/* eslint-disable */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
//
import Iconify from './Iconify';
import { getCurrentUser } from 'src/services/user/current-user';
import constants from 'src/constants';
import navConfigLandingPage from 'src/layouts/dashboard/NavConfigLandingPage';

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  // borderRadius: theme.shape.borderRadius,
  width: '0%',
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: '#ffadad',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};

function NavItem({ landingPage, footerView, item, active }) {
  const theme = useTheme();

  const isActiveRoot = active(item.path);

  const { title, path, icon, info, children } = item;

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    // color: 'primary.main',
    // color: '#2F4858',
    color: '#fff',
    //
    /* Line 31 */
    fontWeight: '600',
    fontSize: '21px',
    borderBottom: '4px solid #ffadad',

    //
    fontWeight: 'fontWeightMedium',
    // bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <ListItemStyle
                  key={title}
                  component={RouterLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text',
                        transition: (theme) => theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'primary.main',
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      style={{
        color: '#fff',
        maxWidth: '6%',
        fontWeight: '400',
        fontSize: '15px',
        lineHeight: '25px',
        marginRight: '3%',
      }}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}

NavSectionLandingPage.propTypes = {
  navConfig: PropTypes.array,
};

export default function NavSectionLandingPage({ landingPage, footerView, navConfig, ...other }) {
  const { pathname } = useLocation();
  const url = window.location.href;
  const pageID = url.substring(url.lastIndexOf('/') + 1);

  const match = (path) => {
    const { pathname } = useLocation();

    return path === '/dashboard/app'
  };
  return (
    // <Box {...other}>
    // <List disablePadding sx={{ p: 1 }}>
    navConfigLandingPage.map((item) => (
      <NavItem landingPage={landingPage} footerView={footerView} key={item.title} item={item} active={match} />
    ))
    // </List>
    // </Box>
  );
}
