/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Link,
  Card,
  Grid,
  Typography,
  CardContent,
  CardActions,
  Stack,
  Input,
  Autocomplete,
  createFilterOptions,
  TextField,
  Checkbox,
  Button,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

// utils
import Iconify from '../../../components/Iconify';
import { jsonWebService } from 'src/infrastructure/web-service';
import { URL_WS } from 'src/constants';
import * as eventsService from 'src/infrastructure/sub-pub-events/eventsSystem';
import { NOTIFICATION_TOAST_EVENT } from 'src/infrastructure/sub-pub-events/eventTypes';
import Translation from 'src/Translation';
import BlogAddConsultantDetails from './BlogAddConsultantDetails';
import LoadingSpinner from 'src/components/Spinner/Spinner';
// import { fShortenNumber } from '../../../utils/formatNumber';
// //
// import SvgIconStyle from '../../../components/SvgIconStyle';
// import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

BlogAddUserCard.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number,
};

const useStyles = makeStyles({
  button: {
    backgroundColor: '#2F95CA',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#2F95CA',
      color: '#fff',
      borderColor: '#2F95CA',
    },
  },
  buttonOutlined: {
    backgroundColor: '#fff',
    color: '#2F95CA',
    borderColor: '#2F95CA',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#2F95CA',
      borderColor: '#2F95CA',
    },
  },
});

export default function BlogAddUserCard({ setShowAddUserForm, handleClose, getUsers }) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [uploadedPhoto, setUploadedPhoto] = useState('');
  const [sourcePhoto, setSourcePhoto] = useState('');
  const [uploadedVideo, setUploadedVideo] = useState('');
  const [sourceVideo, setSourceVideo] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [profession, setProfession] = useState('');
  const [space, setSpace] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [disableAddButton, setDisableAddButton] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {}, []);
  const handleUploadMedia = (fileToUpload, type) => {
    let fileName = type === 'image' ? firstName : firstName + 'video';
    setLoading(true);
    toBase64(fileToUpload)
      .then((res) => {
        const blb = res.split(',');
        jsonWebService
          .post(`${URL_WS}/user/uploadMedia`, {
            name: `${fileName}${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}${
              fileToUpload.name
            }`.replace(/\s/g, ''),
            image: blb[1],
          })
          .then((res) => {
            console.log('====>res', res);
          })
          .catch((err) => {
            console.log('====>err', err);
          });
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const AddNewUser = () => {
    let data = {
      firstName: firstName,
      userName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      telephone: phone,
      role: role,
      userDescription: userDescription,
      profession: profession,
      photo: `${firstName}${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}${
        uploadedPhoto.name
      }`.replace(/\s/g, ''),
      consultantVideo: `${firstName}video${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}${uploadedVideo.name}`.replace(/\s/g, ''),
    };

    setDisableAddButton(true);
    handleUploadMedia(uploadedPhoto, 'image');
    handleUploadMedia(uploadedVideo, 'video');

    jsonWebService
      .post(`${URL_WS}/user/add`, data)
      .then((response) => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setSpace('');
        setUserDescription('');
        setProfession('');
        setSourcePhoto('');
        setSourceVideo('');
        setPassword('');
        setRole('');
        setDisableAddButton(false);
        setShowAddUserForm(false);
        eventsService.publish(NOTIFICATION_TOAST_EVENT, {
          toastMessage: <Translation message={response.message} />,
          variant: response.status,
        });
        getUsers();
        setAlert({ open: true, type: 'success', message: 'User added successfully' });
      })
      .catch((err) => {});
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      setLoading(false);
    });

  return (
    <Grid item md="12">
      {/* <Card sx={{ position: 'relative' }}> */}
      <>
        *
        {loading ? (
          <div style={{ marginTop: '10%', marginBottom: '20%' }}>
            <LoadingSpinner type="big" />
          </div>
        ) : (
          <div className="ml-5">
            <Grid container spacing={2} sx={{ marginTop: 1 }}>
              <Grid item xs={4}>
                <div
                  style={{
                    color: '#2f4858',
                    display: 'flex',
                  }}
                >
                  <Iconify icon="ant-design:user-outlined" sx={{ width: 16, height: 16, mr: 1.5 }} />

                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    placeholder="Last name"
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div
                  style={{
                    color: '#2f4858',
                    display: 'flex',
                  }}
                >
                  <Iconify icon="ant-design:user-outlined" sx={{ width: 16, height: 16, mr: 1.5 }} />

                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    placeholder="First name"
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div
                  style={{
                    color: '#2f4858',
                    display: 'flex',
                  }}
                >
                  <Iconify icon="cib:mail-ru" sx={{ width: 16, height: 16, mr: 1.5 }} />

                  <Input
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="Email"
                  />
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: 1 }}>
              <Grid item xs={4}>
                <div
                  style={{
                    color: '#2f4858',
                    display: 'flex',
                  }}
                >
                  <Iconify icon="akar-icons:phone" sx={{ width: 16, height: 16, mr: 1.5 }} />

                  <Input
                    type="text"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    placeholder="Phone"
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div
                  style={{
                    color: '#2f4858',
                    display: 'flex',
                  }}
                >
                  <Iconify icon="mdi:password" sx={{ width: 16, height: 16, mr: 1.5 }} />

                  <Input
                    type="text"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="Password"
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div
                  style={{
                    color: '#2f4858',
                    display: 'flex',
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      label="Role"
                      placeholder="Role"
                      style={{ width: '70%' }}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <MenuItem value={'admin'}>Admin</MenuItem>
                      <MenuItem value={'client'}>Client</MenuItem>
                      <MenuItem value={'consultant'}>Consultant</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </Grid>
            </Grid>
            {role === 'consultant' && (
              <Grid container spacing={2} sx={{ marginTop: 1 }}>
                <Typography variant="h6" color={'#2F95CA'} sx={{}}>
                  Add Consultant Information
                </Typography>
                <BlogAddConsultantDetails
                  gAddConsultantDetails
                  uploadedPhoto={uploadedPhoto}
                  setUploadedPhoto={setUploadedPhoto}
                  sourcePhoto={sourcePhoto}
                  setSourcePhoto={setSourcePhoto}
                  uploadedVideo={uploadedVideo}
                  setUploadedVideo={setUploadedVideo}
                  sourceVideo={sourceVideo}
                  setSourceVideo={setSourceVideo}
                  userDescription={userDescription}
                  setUserDescription={setUserDescription}
                  profession={profession}
                  setProfession={setProfession}
                />
              </Grid>
            )}
          </div>
        )}
      </>

      <Button
        variant="contained"
        className={classes.button}
        sx={{ backgroundColor: '#86B4FF', marginTop: '1%', marginBottom: '1%' }}
        onClick={() => {
          AddNewUser();
        }}
        // disabled={disableAddButton}
      >
        Add
      </Button>
      <Button
        className={classes.buttonOutlined}
        variant="outlined"
        sx={{ marginTop: '1%', marginBottom: '1%', marginLeft: '1%' }}
        onClick={handleClose}
      >
        Cancel
      </Button>
      {/* </Card> */}
    </Grid>
  );
}
