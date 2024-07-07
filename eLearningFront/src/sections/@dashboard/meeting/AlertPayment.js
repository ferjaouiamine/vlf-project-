/* eslint-disable */
import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  createTheme,
  ThemeProvider,
  Typography,
  Link,
  styled,
  Rating,
  Checkbox,
  ImageList,
  ImageListItem,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import moment from 'moment';
import Iconify from '../../../components/Iconify';
import './style.css';
import { jsonWebService } from '../../../infrastructure/web-service';
import { URL_WS } from '../../../constants';

// import Slide from '@mui/material/Slide';

const theme = createTheme({
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.2)',
      },
    },
  },
});

const TitleStyle = styled(Link)({
  // height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  fontWeight: 'bold',
  textAlign:'center'
});
export default function AlertPayment(props) {
  const { openPopupPayment, setOpenPopupPayment, selectedMeeting, getAllMeetings } = props;
  
  const [disableButton, setDisableButton] = useState(false);


  const handleClose = () => {
    setOpenPopupPayment(false);
  };

  const handleChangeConsultant = (e) => {
    setSelectedConsultant(e.target.value)
  }

  const doPayment = () => {
    setDisableButton(true)
    const url = `${URL_WS}/meeting/update/${selectedMeeting._id}`;
    jsonWebService
      .post(url, {
        status: 'payed'
      })
      .then((response) => {
        setDisableButton(false)
        getAllMeetings()
        handleClose()
      })
      .catch((err) => {
        console.log('errrrrrrrrrrrrrrrr doing payment', err)
      });
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Dialog
          theme={theme}
          open={openPopupPayment}
          // TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="lg"
        >
          {/* <DialogTitle>{'Référence commande'}</DialogTitle> */}
          <DialogTitle>
            <TitleStyle to="#" color="inherit" variant="subtitle2" underline="none">
              Do you want to make payment to {selectedMeeting?.user[0].firstName} {selectedMeeting?.user[0].lastName} ?
            </TitleStyle>
          </DialogTitle>
          <DialogContent style={{textAlign: 'center'}}>
            <div style={{ textAlign: 'center', display:'inline-flex' }}>
              <Button variant="contained" style={{ marginTop: '3%', marginRight: '3%' }} onClick={handleClose}>
                Annuler
              </Button>
              <Button
                variant="contained"
                style={{ marginTop: '3%', backgroundColor: '#86bc28' }}
                disabled={disableButton}
                onClick={e => doPayment()}
              >
                Pay
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}
AlertPayment.propTypes = {
    openPopupPayment: PropTypes.object.isRequired,
    setOpenPopupPayment: PropTypes.object.isRequired,
};
