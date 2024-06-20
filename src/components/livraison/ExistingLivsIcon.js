import React from 'react';
// material
import { Autocomplete,
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
        Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Iconify from '../Iconify';

// ----------------------------------------------------------------------
// eslint-disable-next-line react/prefer-stateless-function
class ExistingLivsIcon extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  

    render(){
        const { icon, title, total, color = 'primary', customColor, handleClickShowForm, isClickable }= this.props
        return (
          <>
          <Grid item xs={12} sm={6} md={1} style={{marginLeft:'4%'}} >
          {/* <Card
      sx={{
        py: 1,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: '#f9fafb',
        width:'70%'
      }}
      onClick={e => handleClickShowForm(e)}
    > */}
      <IconWrapperStyle
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(  theme.palette[color].dark, 0)} 0%, ${alpha(
                theme.palette[color].dark,
              0.24
            )} 100%)`,
            marginBottom:'1%', 
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </IconWrapperStyle>
      <Typography  style={{textAlign:'center'}}>{total}</Typography>
    {/* </Card> */}
          </Grid>
        </>
      );
    }

  
}

export default ExistingLivsIcon

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
