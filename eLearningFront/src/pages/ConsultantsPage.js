/* eslint-disable */
import * as React from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Container,
  Typography,
  Stack,
  Button,
  ThemeProvider,
  DialogTitle,
  Dialog,
  DialogContent,
  Link,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

// components
import Page from '../components/Page';
// sections
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jsonWebService } from 'src/infrastructure/web-service';
import { URL_WS } from 'src/constants';
import { useEffect } from 'react';
import ConsultantCardComponent from 'src/components/ConsultantComponents/ConsultantCardComponent';
import { ConsultantHeaderComponent } from 'src/components/ConsultantComponents/ConsultantHeaderComponent';
import LoadingSpinner from 'src/components/Spinner/Spinner';
import { styled } from '@mui/material/styles';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs, { Dayjs } from 'dayjs';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LOCAL_STORAGE_LOGGED_IN_KEY } from 'src/ProtectedRoute';
import { getCurrentUser } from 'src/services/user/current-user';
import moment from 'moment';
// ----------------------------------------------------------------------

const user = localStorage.getItem(LOCAL_STORAGE_LOGGED_IN_KEY);
export default function ConsultantsPage() {
  const theme = useTheme();
  const TitleStyle = styled(Link)({
    // height: 44,
    overflow: 'hidden',
    WebkitLineClamp: 2,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 'large',
  });
  const navigate = useNavigate();
  const [consultantsList, setConsultantsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startMeet, setStartMeet] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [dateValue, setDateValue] = useState('');
  const [commentValue, setCommentValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');

  useEffect(() => {
    setLoading(true);
    jsonWebService
      .get(`${URL_WS}/user/getAll`)
      .then((response) => {
        let ConsultantData = response.data;
        let consultantsList = ConsultantData.filter((e) => e.role === 'consultant');
        setConsultantsList(consultantsList);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const testPeerConn = () => {
    navigate('/dashboard/roomChat', { replace: true });
    setTimeout(() => window.location.reload(), 5000);
  };

  const confirmMeet = () => {
    console.log('haniiii houni', dateValue);
    let data = {
      user: getCurrentUser().id,
      date: new Date(dateValue),
      // date:`${new Date(dateValue).getDate()}/${new Date(dateValue).getMonth() + 1}/${new Date(dateValue).getFullYear()} ${new Date(dateValue).getHours()}:${new Date(dateValue).getMinutes()}`,
      status: 'in progress',
      comment: commentValue,
      category: categoryValue,
    };
    console.log('dataaaaaa', data);

    jsonWebService
      .post(`${URL_WS}/meeting/add`, data)
      .then((response) => {
        setStartMeet(true);
        setShowForm(false);
      })
      .catch((err) => {
        console.log('errrrrrrrrrr', err);
      });
  };

  return (
    <Page title="Training management" sx={{ padding: '0px;' }}>
      <Container maxWidth="xxl" sx={{ padding: '0px;' }}>
        <Grid>
          <ConsultantHeaderComponent />
        </Grid>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          {/* <Typography variant="h4" gutterBottom>
            Consultants
          </Typography> */}
        </Stack>
        {loading ? (
          <LoadingSpinner type="big" />
        ) : (
          <Grid container spacing={2} alignItems="center" sx={{ padding: '0px;' }}>
            {consultantsList.map((consultant) => (
              <ConsultantCardComponent consultant={consultant} consultantsList={consultantsList} />
            ))}
          </Grid>
        )}
        <center>
          {getCurrentUser().role === 'client' && (
            <Button
              variant="contained"
              style={{ marginTop: '4rem', backgroundColor: '#dda902' }}
              // onClick={(e) => testPeerConn()}
              onClick={(e) => {
                user == 'false'
                  ? navigate('/login', {
                      replace: true,
                    })
                  : setShowForm(true);
              }}
            >
              Book your consulting meet {getCurrentUser().role}
            </Button>
          )}

          {/* {!startMeet && (
            <Button
              variant="contained"
              style={{ marginTop: '4rem', backgroundColor: '#86B4FF' }}
              // onClick={(e) => testPeerConn()}
              onClick={(e) => {
                // user == 'false'
                //   ? navigate('/login', {
                //       replace: true,
                //     })
                //   :
                setShowForm(true);
              }}
            >
              Book your consulting meet
            </Button>
          )}
        </center>
        <center>
          {startMeet && (
            <Button
              variant="contained"
              style={{ marginTop: '4rem', backgroundColor: '#86B4FF' }}
              onClick={(e) => testPeerConn()}
              // onClick={(e) => setShowForm(true)}
            >
              Start your meeting
            </Button>
          )} */}
        </center>
      </Container>

      <ThemeProvider theme={theme}>
        <Dialog
          theme={theme}
          open={showForm}
          // TransitionComponent={Transition}
          keepMounted
          onClose={(e) => setShowForm(false)}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="lg"
        >
          <DialogTitle>
            <TitleStyle to="#" color="inherit" variant="subtitle2" underline="none">
              Please fill out the form
            </TitleStyle>
          </DialogTitle>
          <DialogContent>
            <div style={{ width:"50%",textAlign: 'center', display: '-webkit-box' }}>
              <center>
                <img src="/images/bookin.jpg" alt="my-gif" width="50%" />
              </center>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Reservation date"
                  value={dateValue}
                  onChange={(newValue) => {
                    setDateValue(newValue);
                  }}
                />
              </LocalizationProvider>
              <br />
              <TextField
                style={{ marginTop: '2%' }}
                label="Comment"
                multiline
                onChange={(e) => setCommentValue(e.target.value)}
              />
              <br />
              <Button variant="contained" style={{ marginTop: '1%', marginRight: '3%' }} onClick={(e) => confirmMeet()}>
                Confirm
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </Page>
  );
}
