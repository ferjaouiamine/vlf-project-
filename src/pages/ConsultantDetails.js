/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ReactCardSlider from 'react-card-slider-component';
import './styles.css';

// material
import { styled } from '@mui/material/styles';
import { Box, Link, Card, Typography, Stack, createTheme, Container } from '@mui/material';

import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { Grid, Paper } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import Page from 'src/components/Page';
import { makeStyles } from '@material-ui/core/styles';
import VideoPlayer from 'src/components/videoPlayer/VideoPlayer';
import { URL_WS } from 'src/constants';
import ConsultantsSlider from 'src/components/ConsultantComponents/ConsultantsSlider';
import { slice } from 'lodash';
import './consultant.css';

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

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3rem',
    width: '100%',
    margin: 'auto',
  },
}));
const headersStyles = {
  color: 'black',
  marginTop: '4rem',
  marginBottom: '4rem',
};

export default function ConsultantDetails({ withTest }) {
  const { state } = useLocation();

  let consultantsList = state.allData[0];
  let consultantData = state.allData[1];
  const navigate = useNavigate();
  let navigateData = state;
  const slides = consultantsList.map((consultant) => ({
    image: `${URL_WS}/uploads/${consultant.photo}/${consultant.photo}`,
    title: consultant.firstName,
    description: consultant.profession,
    clickEvent: () => {
      navigate('/dashboard/consultantDetails', {
        replace: true,
        state: { allData: [consultantsList, consultant] },
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  }));

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
    setShowDetails(false);
  };

  const classes = useStyles();
  return (
    <>
      <React.Fragment>
        <Page title="TrainingDetail">
          <Container maxWidth="lg" style={{ overflow: 'hidden' }}>
            <Stack direction="row" spacing={2} marginBottom={8} marginTop={10}>
              <Card sx={{ width: 209, height: 209, marginLeft: 0 }}>
                <CardMedia
                  component="img"
                  image={`${URL_WS}/uploads/${consultantData.photo}/${consultantData.photo}`}
                  alt="Your Image"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Card>
              <Stack spacing={1} style={{ marginTop: '2rem' }}>
                <Typography color="black" variant="h2">
                  {consultantData.firstName}
                </Typography>
                <Typography color="black" variant="h4">
                  {consultantData.profession}
                </Typography>
              </Stack>
            </Stack>
            <Typography color={'black'} className="headersStyle" variant="h3" gutterBottom>
              Description
            </Typography>
            <Typography marginBottom={'6rem'} variant="body1" gutterBottom>
              {consultantData.userDescription}
            </Typography>
          </Container>
          <center>
            {consultantData.consultantVideo && (
              <video
                style={{ width: '60%', height: '80%' }}
                className="VideoInput_video"
                width="500"
                height="340"
                controls
                src={`${URL_WS}/uploads/${consultantData.consultantVideo}/${consultantData.consultantVideo}`}
              />
            )}
            <Typography variant="h2" className="headersStyle" style={headersStyles} gutterBottom>
              Discover More Consultants
            </Typography>
            <ReactCardSlider slides={slides} />
          </center>
          {/* <Grid container spacing={2} alignItems="center" sx={{ padding: '0px;' }}>
            {consultantsList.map((consultant) => (
              <ConsultantsSlider consultant={consultant} />
            ))}
          </Grid> */}
        </Page>
      </React.Fragment>
    </>
  );
}
