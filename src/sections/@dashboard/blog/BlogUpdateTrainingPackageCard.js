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

BlogUpdateTrainingPackageCard.propTypes = {
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

export default function BlogUpdateTrainingPackageCard({
  trainingPackageTitle,
  setTrainingPackageTitle,
  trainingPackageDescription,
  setTrainingPackageHours,
  trainingPackageHours,
  setTrainingPackageDescription,
  sourceImg,
  setSourceImg,
  uploadedFileImg,
  setUploadedFileImg,
  trainingCategory,
  setTrainingCategory,
  trainingId,
}) {
  const classes = useStyles();

  const [disableAddButton, setDisableAddButton] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [valid, setValid] = useState(true);
  useEffect(() => {}, []);
  const handleValidation = (e) => {
    const reg = new RegExp('^[0-9]*$');
    setValid(reg.test(e.target.value));
    setTrainingPackageHours(e.target.value);
  };
  const handleImportVideo = (e) => {
    setUploadedFileImg(e.target.files[0]);
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setSourceImg(url);
  };

  const handleClickImportVid = (event) => {
    const { target = {} } = event || {};
    target.value = '';
  };

  const handleChangeCategory = (e) => {
    setTrainingCategory(e.target.value);
  };

  return (
    <Grid item md="12">
      {/* <Card sx={{ position: 'relative' }}> */}
      <>
        <Grid sx={{ marginBottom: '1%' }}>
          <FormControl style={{ width: '20%', marginBottom: '1%', marginTop: '1%' }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Category"
              value={trainingCategory}
              onChange={handleChangeCategory}
            >
              <MenuItem value={'community social entrepreneurs'}>community social entrepreneurs</MenuItem>
              <MenuItem value={'non-profit social entrepreneurs'}>non-profit social entrepreneurs</MenuItem>
              <MenuItem value={'transformational social entrepreneurs'}>
                {'transformational social entrepreneurs'}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid sx={{ marginBottom: '1%' }}>
          <Input
            type="text"
            value={trainingPackageTitle}
            onChange={(e) => {
              setTrainingPackageTitle(e.target.value);
            }}
            placeholder="Training package title"
          />
          <Input
            type="number"
            error={!valid}
            value={trainingPackageHours}
            onChange={(e) => {
              handleValidation(e);
            }}
            placeholder="Training hours"
          />
        </Grid>
        <Grid sx={{ marginBottom: '1%' }}>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:cloud-upload-outline" />}
            onClick={() => document.getElementById(`input${trainingId}`).click()}
            mask="__/__/____"
          >
            Import an image
          </Button>
          <input
            type="file"
            id={`input${trainingId}`}
            onChange={(e) => handleImportVideo(e)}
            onClick={handleClickImportVid}
            style={{ display: 'none' }}
          />
        </Grid>
        {sourceImg && (
          <Grid sx={{ marginBottom: '1%' }}>
            {/* <img src={`${URL_WS}/uploads/${VeilleComm._id}/${VeilleComm.photo}`} /> */}
            <center>
              <img src={sourceImg} width="40%" />
            </center>
          </Grid>
        )}
        <Grid sx={{ marginBottom: '1%' }}>
          <Input
            type="text"
            value={trainingPackageDescription}
            onChange={(e) => {
              setTrainingPackageDescription(e.target.value);
            }}
            placeholder="Training package description"
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
