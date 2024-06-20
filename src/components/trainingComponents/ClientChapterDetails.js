/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

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
  Container,
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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import moment from 'moment';
import { URL_WS } from 'src/constants';
import Page from '../Page';

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

export default function ClientChapterDetails({ withTest }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  let chapterData = state.allChapters[state.index];
  const theme = createTheme({
    overrides: {
      MuiBackdrop: {
        root: {
          backgroundColor: 'rgba(0,0,0,0.2)',
        },
      },
    },
  });

  const [showDetails, setShowDetails] = useState(false);
  const [showDeletePost, setShowDeletePost] = useState(false);
  const closeDetailDialog = () => {
    let vid = document.getElementById('thisVid');
    vid.pause();
    vid.currentTime = 0;
    setShowDetails(false);
  };
  return (
    <>
      <Page title="AddTrainingPackage">
        <Container maxWidth="xl">
          <ThemeProvider theme={theme}>
            <div className="routeStyle" style={{ marginLeft: '8%', marginBottom: '4%' }}>
              {' '}
              Dashboard / Training Details / Chapter Details
            </div>
            <div style={{ textAlign: 'center' }}>
              <Typography variant="h6" color={'#2F95CA'} sx={{}}>
                Chapter Name: {chapterData.chapterName}
              </Typography>
            </div>
            <div style={{ marginBottom: '5px' }}>
              <center>
                {/* <img src="/images/pc.jpg" /> */}
                <video width="500" height="340" id="thisVid" controls>
                  <source
                    src={`${URL_WS}/uploads/${chapterData.videoName}/${chapterData.videoName}`}
                    type="video/mp4"
                  />
                </video>
              </center>
            </div>
            <div style={{ textAlign: 'center', marginLeft: '7%', marginRight: '7%', marginTop: '2%' }}>
              <Typography variant="body3" color="text.secondary">
                this a new chapter of training
              </Typography>
            </div>
            {/* {withTest && ( */}
            <div style={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                style={{ marginTop: '1%', backgroundColor: '#86b4ff' }}
                onClick={(e) =>
                  navigate('/dashboard/trainingTest', {
                    replace: true,
                    state: {
                      chapter: state.chapter,
                      allChapters: state.allChapters,
                      finalExam: state.finalExam,
                      index: state.index,
                    },
                  })
                }
              >
                Pass the test
              </Button>
            </div>
            {/* )} */}
          </ThemeProvider>
        </Container>
      </Page>
    </>
  );
}
