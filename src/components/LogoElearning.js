/* eslint-disable */
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

LogoElearning.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
  location: PropTypes.string,
};

export default function LogoElearning(location) {
  let logo;
  if (location.location === 'login') {
    logo = (
      <img
        style={{ display: 'inline', marginBottom: '10%' }}
        src={process.env.PUBLIC_URL + '/images/logo.svg'}
        alt=""
        width="50%"
      />
    );
  } else if (location.location === 'bonLivraison') {
    logo = (
      <img
        style={{ display: 'flex', textAlign: 'center', margin: 'auto', marginTop: '-7%' }}
        src={process.env.PUBLIC_URL + '/images/logo.svg'}
        alt=""
      />
    );
  } else if (location.location === 'sideBar') {
    logo = <img style={{ width: '2%' }} src={process.env.PUBLIC_URL + '/images/logo.svg'} alt="" />;
  } else if (location.location === 'navBar') {
    logo = <img style={{ width: '100%' }} src={process.env.PUBLIC_URL + '/images/logo.svg'} alt="" />;
  } else if (location.location === 'footer') {
    logo = <img style={{ width: '30%' }} src={process.env.PUBLIC_URL + '/images/logo.svg'} alt="" />;
  } else {
    logo = (
      <img
        style={{ display: 'flex', textAlign: 'center', margin: 'auto', width: '70%' }}
        src={process.env.PUBLIC_URL + '/images/logo.svg'}
        alt=""
      />
    );
  }

  return <RouterLink to="/dashboard/app">{logo}</RouterLink>;
}
