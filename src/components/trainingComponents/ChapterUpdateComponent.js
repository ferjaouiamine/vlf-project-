/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Link,
  Card,
  Grid,
  Button,
  Typography,
  CardContent,
  CardActions,
  Stack,
  Input,
  Autocomplete,
  createFilterOptions,
  TextField,
  Checkbox,
  createTheme,
  ThemeProvider,
  DialogTitle,
  Dialog,
  DialogContent,
  InputLabel,
  FormControl,
  Select, MenuItem
} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red, blue } from '@mui/material/colors';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import { URL_WS } from 'src/constants';
import BlogUpdateTrainingPackageCard from 'src/sections/@dashboard/blog/BlogUpdateTrainingPackageCard';
import Iconify from '../Iconify';

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const TitleStyle = styled(Link)({
  // height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  fontWeight: 'bold',
});

export default function ChapterUpdateComponent({
            chapterTitle,
            setChapterTitle,
            chapterDescription,
            setChapterDescription,
            sourceVid,
            setSourceVid,
            chapterId,
            setUploadedFileVid,
            uploadedFileVid,
            closeDetailDialog,
            handleUpdateTraining
}) {
  const theme = createTheme({
    overrides: {
      MuiBackdrop: {
        root: {
          backgroundColor: 'rgba(0,0,0,0.2)',
        },
      },
    },
  });

  const handleImportVideo = (e) => {
    setUploadedFileVid(e.target.files[0])
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setSourceVid(url);
  };

  const handleClickImportVid = (event) => {
    const { target = {} } = event || {};
    target.value = '';
  };

  return (
    <>
      <center>
          <Grid sx={{marginBottom: '1%', marginTop:'1%'}}>
      <Input
            type="text"
            value={chapterTitle}
            onChange={(e) => {
                               setChapterTitle(e.target.value);
                             }}
            placeholder="Training package title"
                />
                </Grid>

                <Grid sx={{marginBottom: '1%'}}>
                <Button
               variant="contained"
               startIcon={<Iconify icon="eva:cloud-upload-outline" />}
               onClick={() => document.getElementById(`input${chapterId}`).click()}
               mask="__/__/____"
             >
               Import a video
             </Button>
             <input
               type="file"
               id={`input${chapterId}`}
               onChange={(e) => handleImportVideo(e)}
               onClick={handleClickImportVid}
               style={{ display: 'none' }}
             />
      </Grid>
      {
        sourceVid && (
          <Grid sx={{marginBottom: '1%'}}>
          {/* <img src={`${URL_WS}/uploads/${VeilleComm._id}/${VeilleComm.photo}`} /> */}
          <center>
          <video
            className="VideoInput_video"
            id={`thisVid${chapterId}`}
            width="500" 
            height="340"
            controls
            src={sourceVid}
          />
          </center>
          </Grid>
        )
      }

                <div style={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                {chapterDescription}
                </Typography>
                </div>
                
            </center>
         </>
  )
}