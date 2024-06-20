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
// import { fShortenNumber } from '../../../utils/formatNumber';
// //
// import SvgIconStyle from '../../../components/SvgIconStyle';
// import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

BlogAddConsultantDetails.propTypes = {
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

export default function BlogAddConsultantDetails({
  uploadedPhoto,
  setUploadedPhoto,
  sourcePhoto,
  setSourcePhoto,
  uploadedVideo,
  setUploadedVideo,
  sourceVideo,
  setSourceVideo,
  userDescription,
  setUserDescription,
  profession,
  setProfession,
}) {
  const handleImportMedia = (e) => {
    setUploadedPhoto(e.target.files[0]);
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setSourcePhoto(url);
  };
  const handleImportVideo = (e) => {
    setUploadedVideo(e.target.files[0]);
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setSourceVideo(url);
  };
  const handleClickImportMedia = (event) => {
    const { target = {} } = event || {};
    target.value = '';
  };
  return (
    <Grid item md="12">
      {/* <Card sx={{ position: 'relative' }}> */}
      <>
        <div className="ml-5">
          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            <Grid sx={{ marginBottom: '1%', marginLeft: '25%', display: 'inline-flex' }}>
              <InputLabel style={{ marginTop: '0.5rem', marginRight: '2rem' }} id="demo-simple-select-label">
                Photo de profil :
              </InputLabel>
              <Button
                variant="contained"
                component={RouterLink}
                to="#"
                startIcon={<Iconify icon="eva:cloud-upload-outline" />}
                onClick={() => document.getElementById('input').click()}
                mask="__/__/____"
              >
                Import an image
              </Button>
              <input
                type="file"
                id="input"
                onChange={(e) => handleImportMedia(e)}
                onClick={handleClickImportMedia}
                style={{ display: 'none' }}
              />
            </Grid>
            {sourcePhoto && (
              <Grid sx={{ marginBottom: '1%', marginTop: '2%', marginLeft: '31%' }}>
                {/* <img src={`${URL_WS}/uploads/${VeilleComm._id}/${VeilleComm.photo}`} /> */}
                <img src={sourcePhoto} width="40%" />
              </Grid>
            )}
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            <Grid sx={{ marginBottom: '5%', marginTop: '3%', marginLeft: '25%', display: 'inline-flex' }}>
              <InputLabel style={{ marginTop: '0.5rem', marginRight: '2rem' }} id="demo-simple-select-label">
                video consultant :
              </InputLabel>
              <Button
                variant="contained"
                component={RouterLink}
                to="#"
                startIcon={<Iconify icon="eva:cloud-upload-outline" />}
                onClick={() => document.getElementById('inputVideo').click()}
                mask="__/__/____"
              >
                Import a video
              </Button>
              <input
                type="file"
                id="inputVideo"
                onChange={(e) => handleImportVideo(e)}
                onClick={handleClickImportMedia}
                style={{ display: 'none' }}
              />
            </Grid>
            {sourceVideo && (
              <Grid sx={{ marginBottom: '1%', marginLeft: '14rem' }}>
                <video className="VideoInput_video" width="500" height="340" controls src={sourceVideo} />
              </Grid>
            )}
          </Grid>
          <Grid sx={{ marginTop: 1 }}>
            <center>
              <Grid item xs={4} sx={{ marginBottom: '1%', marginLeft: '-5%' }}>
                <Input
                  type="text"
                  value={profession}
                  onChange={(e) => {
                    setProfession(e.target.value);
                  }}
                  placeholder="Profession"
                  sx={{ width: '100%' }}
                />
              </Grid>
            </center>
            <Grid sx={{ marginBottom: '1%', marginLeft: '-11%' }}>
              <Input
                type="text"
                value={userDescription}
                onChange={(e) => {
                  setUserDescription(e.target.value);
                }}
                placeholder="Consultant description"
                multiline
                sx={{ width: '85%' }}
              />
            </Grid>
          </Grid>
        </div>
      </>
      {/* </Card> */}
    </Grid>
  );
}
