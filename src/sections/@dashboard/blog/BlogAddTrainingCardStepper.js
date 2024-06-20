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
  Select,
  MenuItem,
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

BlogAddTrainingCardStepper.propTypes = {
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

export default function BlogAddTrainingCardStepper({
  trainingTitle,
  setTrainingTitle,
  trainingDescription,
  setTrainingDescription,
  sourceVid,
  setSourceVid,
  uploadedFileVid,
  setUploadedFileVid,
}) {
  const classes = useStyles();

  const [disableAddButton, setDisableAddButton] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {}, []);

  const handleImportVideo = (e) => {
    setUploadedFileVid(e.target.files[0]);
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setSourceVid(url);
  };

  const handleClickImportVid = (event) => {
    const { target = {} } = event || {};
    target.value = '';
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handleChangeCategory = (e) => {
    setTrainingCategory(e.target.value);
  };

  return (
    <Grid item md="12">
      {/* <Card sx={{ position: 'relative' }}> */}
      <>
        <Grid sx={{ marginBottom: '1%' }}>
          <Input
            type="text"
            value={trainingTitle}
            onChange={(e) => {
              setTrainingTitle(e.target.value);
            }}
            placeholder="Training title"
            style={{ marginTop: '5%' }}
          />
        </Grid>
        <Grid sx={{ marginBottom: '1%' }}>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:cloud-upload-outline" />}
            onClick={() => document.getElementById('input').click()}
            mask="__/__/____"
          >
            Import a video
          </Button>
          <input
            type="file"
            id="input"
            onChange={(e) => handleImportVideo(e)}
            onClick={handleClickImportVid}
            style={{ display: 'none' }}
          />
        </Grid>
        {sourceVid && (
          <Grid sx={{ marginBottom: '1%' }}>
            <video className="VideoInput_video" width="500" height="340" controls src={sourceVid} />
          </Grid>
        )}
        <Grid sx={{ marginBottom: '1%' }}>
          <Input
            type="text"
            value={trainingDescription}
            onChange={(e) => {
              setTrainingDescription(e.target.value);
            }}
            placeholder="Training description"
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
      </>
      {/* <Button
        variant="contained"
        className={classes.button}
        sx={{ marginTop: '1%', marginBottom: '1%' }}
        onClick={() => {
          AddNewTraining();
        }}
        disabled={disableAddButton}
      >
        Ajouter
      </Button>
      <Button className= {classes.buttonOutlined} variant="outlined" sx={{ marginTop: '1%', marginBottom: '1%', marginLeft: '1%' }} onClick={handleClose}>
        Annuler
      </Button> */}
      {/* </Card> */}
    </Grid>
  );
}
