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
export default function AlertDeleteMeeting(props) {
  const { openPopupDeleteMeeting, setOpenPopupDeleteMeeting, selectedMeeting, getAllMeetings } = props;
  
  const [disableButton, setDisableButton] = useState(false);


  const handleClose = () => {
    setOpenPopupDeleteMeeting(false);
  };

  const deleteMeeting = () => {
    setDisableButton(true)
    const url = `${URL_WS}/meeting/delete/${selectedMeeting._id}`;
    jsonWebService
      .post(url)
      .then((response) => {
        setDisableButton(false)
        getAllMeetings()
        handleClose()
      })
      .catch((err) => {
        console.log('errrrrrrrrrrrrrrrr deleting meeting', err)
        setDisableButton(false)
        getAllMeetings()
        handleClose()
      });
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Dialog
          theme={theme}
          open={openPopupDeleteMeeting}
          // TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="lg"
        >
          {/* <DialogTitle>{'Référence commande'}</DialogTitle> */}
          <DialogTitle>
            <TitleStyle to="#" color="inherit" variant="subtitle2" underline="none">
              Do you want to delete {selectedMeeting?.user[0].firstName} {selectedMeeting?.user[0].lastName}'s meeting' ?
            </TitleStyle>
          </DialogTitle>
          <DialogContent style={{textAlign: 'center'}}>
            <div style={{ textAlign: 'center', display:'inline-flex' }}>
              <Button variant="contained" style={{ marginTop: '3%', marginRight: '3%' }} onClick={handleClose}>
                Annuler
              </Button>
              <Button
                variant="contained"
                style={{ marginTop: '3%', backgroundColor: '#CC555D' }}
                disabled={disableButton}
                onClick={e => deleteMeeting()}
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}
AlertDeleteMeeting.propTypes = {
    openPopupDeleteMeeting: PropTypes.object.isRequired,
    setOpenPopupDeleteMeeting: PropTypes.object.isRequired,
};
