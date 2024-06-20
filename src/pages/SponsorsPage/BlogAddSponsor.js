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
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

BlogAddSponsor.propTypes = {
  //   item: PropTypes.object.isRequired,
  //   index: PropTypes.number,
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

export default function BlogAddSponsor({
  sponsorTitle,
  setSponsorTitle,
  sponsorCategory,
  setSponsorCategory,
  sponsorDescription,
  setSponsorDescription,
  sourceImg,
  setSourceImg,
  uploadedFileImg,
  setUploadedFileImg,
}) {
  useEffect(() => {}, []);
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
    setSponsorCategory(e.target.value);
  };

  return (
    <Grid item md="12">
      {/* <Card sx={{ position: 'relative' }}> */}
      <>
        <Grid sx={{ marginBottom: '1%' }}>
          <FormControl style={{ width: '20%', marginBottom: '1%', marginTop: '7%' }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Category"
              value={sponsorCategory}
              onChange={handleChangeCategory}
            >
              <MenuItem value={'community social entrepreneurs'}>community social entrepreneurs</MenuItem>
              <MenuItem value={'non-profit social entrepreneurs'}>non-profit social entrepreneurs</MenuItem>
              <MenuItem value={'transformational social entrepreneurs'}>
                {' '}
                transformational social entrepreneurs
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <div style={{ display: 'inline-flex', marginBottom: '3%' }}>
          <Grid sx={{ marginBottom: '1%', marginRight: '10%' }}>
            <Input
              type="text"
              value={sponsorTitle}
              onChange={(e) => {
                setSponsorTitle(e.target.value);
              }}
              placeholder="Sponsor title"
            />
          </Grid>
        </div>
        <Grid sx={{ marginBottom: '1%' }}>
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
            onChange={(e) => handleImportVideo(e)}
            onClick={handleClickImportVid}
            style={{ display: 'none' }}
          />
        </Grid>
        {sourceImg && (
          <Grid sx={{ marginBottom: '1%' }}>
            <center>
              <img src={sourceImg} width="40%" />
            </center>
          </Grid>
        )}
        <Grid sx={{ marginBottom: '1%' }}>
          <Input
            type="text"
            value={sponsorDescription}
            onChange={(e) => {
              setSponsorDescription(e.target.value);
            }}
            placeholder="Sponsor description"
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
      </>
    </Grid>
  );
}
