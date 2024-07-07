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
export default function AlertMeetingDetail(props) {
  const { openPopupMeetingDetail, setOpenPopupMeetingDetail, selectedMeeting, consultantsList, getAllMeetings } = props;
  
  const [disableButton, setDisableButton] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState(selectedMeeting?.consultant? selectedMeeting?.consultant[0]?._id : '');

  useEffect(() => {
    setSelectedConsultant(selectedMeeting?.consultant ? selectedMeeting?.consultant[0]?._id : '')
  }, [selectedMeeting]);

  const handleClose = () => {
    setOpenPopupMeetingDetail(false);
  };

  const handleChangeConsultant = (e) => {
    setSelectedConsultant(e.target.value)
  }

  const affectConsultant = () => {
    setDisableButton(true)
    const url = `${URL_WS}/meeting/update/${selectedMeeting._id}`;
    jsonWebService
      .post(url, {
        consultant: selectedConsultant,
        status: 'validation'
      })
      .then((response) => {
        setDisableButton(false)
        getAllMeetings()
        handleClose()
      })
      .catch((err) => {
        console.log('errrrrrrrrrrrrrrrr updating', err)
      });
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Dialog
          theme={theme}
          open={openPopupMeetingDetail}
          // TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="lg"
        >
          {/* <DialogTitle>{'Référence commande'}</DialogTitle> */}
          <DialogTitle>
            <TitleStyle to="#" color="inherit" variant="subtitle2" underline="none">
              Meeting Details
            </TitleStyle>
          </DialogTitle>
          <DialogContent style={{textAlign: 'center'}}>
            <div style={{marginTop: '2%', display:'inline-flex'}}>
            <TextField
          id="outlined-multiline-flexible"
          label='User'
          style={{marginLeft:'2%'}}
          value={selectedMeeting ?`${selectedMeeting.user[0].firstName} ${selectedMeeting.user[0].lastName}` : ' '}
                />
            <TextField
            id="outlined-multiline-flexible"
          label='Category'
          style={{marginLeft:'2%'}}
          value={selectedMeeting ?selectedMeeting.category : ' '}
                />
            <TextField
          label='Date'
          style={{marginLeft:'2%'}}
          value={selectedMeeting ?moment(selectedMeeting.date).format('YYYY-MM-DD HH:mm') : ' '}
                />
            </div>
            <br></br>
            <div style={{marginTop: '2%', display:'inline-flex'}}>
            <TextField
          label='Status'
          style={{marginLeft:'2%'}}
          value={selectedMeeting ?selectedMeeting.status : ' '}
                />
            <TextField
          label='Comment'
          style={{marginLeft:'2%'}}
          value={selectedMeeting ?selectedMeeting.comment ? selectedMeeting.comment : ' ' : ' '}
                />
            {/* <TextField
          label='Comment'
          style={{marginLeft:'2%'}}
          value={selectedMeeting ?selectedMeeting.comment : ' '}
                /> */}
            </div>
            <div style={{marginTop: '2%'}}>
            <FormControl sx={{width:'30%'}}>
                    <InputLabel id="demo-simple-select-label">Consultant</InputLabel>
                    <Select
                      label="Consultant"
                      placeholder="Consultant"
                    //   style={{width:'100%'}}
                    onChange={e => handleChangeConsultant(e)}
                    value = { selectedConsultant ? `${selectedConsultant}` : `${selectedMeeting?.consultant ? selectedMeeting?.consultant[0]?._id : ''}`}
                    >
                        {
                            consultantsList.map(c => (
                            <MenuItem value={c._id}>{c.firstName} {c.lastName}</MenuItem>
                            ))
                        }
                    </Select>
                  </FormControl>
            </div>
            <div style={{ textAlign: 'center', display:'inline-flex' }}>
              <Button variant="contained" style={{ marginTop: '3%', marginRight: '3%' }} onClick={handleClose}>
                Annuler
              </Button>
              <Button
                variant="contained"
                style={{ marginTop: '3%', backgroundColor: '#86bc28' }}
                disabled={disableButton}
                onClick={e => affectConsultant()}
              >
                Affecter
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}
AlertMeetingDetail.propTypes = {
    openPopupMeetingDetail: PropTypes.object.isRequired,
    setOpenPopupMeetingDetail: PropTypes.object.isRequired,
};
