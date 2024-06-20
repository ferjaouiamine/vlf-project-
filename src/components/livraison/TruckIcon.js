import React from 'react';
// material
import {
  Autocomplete,
  Button,
  Card,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Iconify from '../Iconify';

// ----------------------------------------------------------------------
// eslint-disable-next-line react/prefer-stateless-function
const TruckIcon = (props) => {
  // eslint-disable-next-line react/state-in-constructor
  const { icon, id, registrationNb, color = 'primary', customColor, handleClickShowForm, isClickable, orders } = props;

  const checkVehicule = (orders, id) => {
    const exist = orders.find((element) => {
      if (element._id === id) {
        return true;
      }

      return false;
    });
    if (exist) {
      return exist.total;
    }

    return 0;
  };

  return (
    <>
      <Grid item xs={12} sm={6} md={1.5} style={{ marginLeft: '4%' }} onClick={(e) => handleClickShowForm(e)}>
        <Card
          sx={{
            py: 1,
            boxShadow: 0,
            textAlign: 'center',
            color: (theme) => theme.palette[color].darker,
            bgcolor: '#d4e1e8',
            // width:'100%'
            marginBottom: '2%',
          }}
          onClick={(e) => handleClickShowForm(e)}
        >
          <IconWrapperStyle
            sx={{
              color: (theme) => theme.palette[color].dark,
              backgroundImage: (theme) =>
                `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
                  theme.palette[color].dark,
                  0.24
                )} 100%)`,
              marginBottom: '1%',
              cursor: isClickable ? 'pointer' : 'auto',
            }}
          >
            <Iconify icon={icon} width={24} height={24} />
          </IconWrapperStyle>
          <Typography style={{ textAlign: 'center' }}>{registrationNb}</Typography>
          {/* <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              50 Commandes
            </Typography> */}

          <h5 style={{ color: '#2065d1', fontWeight: 'lighter' }}>
            {checkVehicule(orders, id)} {checkVehicule(orders, id) > 1 ? 'commandes' : 'commande'}
          </h5>
        </Card>
      </Grid>
    </>
  );
};

export default TruckIcon;

export const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));
