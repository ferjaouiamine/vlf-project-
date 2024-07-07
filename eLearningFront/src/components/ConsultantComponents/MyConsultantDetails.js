/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material
import { styled } from '@mui/material/styles';
import { Box, Link, Card, Typography, Stack, createTheme, Container } from '@mui/material';

import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { Button, Grid, Input, InputLabel, Paper } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import Page from 'src/components/Page';
import { makeStyles } from '@material-ui/core/styles';
import VideoPlayer from 'src/components/videoPlayer/VideoPlayer';
import { URL_WS } from 'src/constants';
import { getCurrentUser } from 'src/services/user/current-user';
import { jsonWebService } from 'src/infrastructure/web-service';
import Iconify from '../Iconify';
import { ja } from 'date-fns/locale';
import { NOTIFICATION_TOAST_EVENT } from 'src/infrastructure/sub-pub-events/eventTypes';
import Translation from 'src/Translation';
import LoadingSpinner from '../Spinner/Spinner';

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
const headersStyle = {
  color: 'black',
  marginTop: '4rem',
};
export default function MyConsultantDetails({ withTest }) {
  console.log('${getCurrentUser().id', getCurrentUser().id);
  const [userDetails, setUserDetails] = useState();
  const [loading, setLoading] = useState();

  const getUserData = () => {
    jsonWebService
      .get(`${URL_WS}/user/getUser/${getCurrentUser().id}`)
      .then((response) => {
        setUserDetails(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    getUserData();
  }, []);
  console.log('userDetails', userDetails);

  const navigate = useNavigate();
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
  const [sourceVid, setSourceVid] = useState();
  const [firstName, setFirstName] = useState();
  const [descriptionText, setDescriptionText] = useState();
  const [sourceImg, setSourceImg] = useState();
  const [profession, setProfession] = useState();
  const [uploadedFileImg, setUploadedFileImg] = useState();
  const [uploadedFileVid, setUploadedFileVid] = useState();
  console.log('sourceImg', sourceImg);
  console.log('sourceVid', sourceVid);

  const closeDetailDialog = () => {
    setShowDetails(false);
  };

  const classes = useStyles();

  const handleClickImportVid = (event) => {
    const { target = {} } = event || {};
    target.value = '';
  };
  const handleClickImportVideo = (event) => {
    const { target = {} } = event || {};
    target.value = '';
  };
  const handleImportVideo = (e) => {
    setUploadedFileVid(e.target.files[0]);
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setSourceVid(url);
  };
  const handleImportImage = (e) => {
    setUploadedFileImg(e.target.files[0]);
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setSourceImg(url);
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      setLoading(false);
    });

  const handleUploadMedia = (fileToUpload, type) => {
    setLoading(true);
    let fileName = type === 'image' ? firstName : firstName + 'video';
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
            setLoading(false);
          })
          .catch((err) => {
            console.log('====>err', err);
            setLoading(false);
          });
      })
      .catch((err) => {});
  };
  const handleUpdateUserInfo = () => {
    let data;
    if (uploadedFileImg !== '') {
      data = {
        firstName: firstName,
        userDescription: descriptionText,
        profession: profession,
        consultantVideo: `${firstName}video${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}${uploadedFileVid.name}`.replace(/\s/g, ''),
        createdAt: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
        photo: `${firstName}${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}${
          uploadedFileImg.name
        }`.replace(/\s/g, ''),
      };
      handleUploadMedia(uploadedFileImg, 'image');
      handleUploadMedia(uploadedFileVid, 'video');
    } else {
      data = {
        firstName: firstName,
        profession: profession,
        userDescription: descriptionText,
        createdAt: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
      };
    }

    setTimeout(
      () =>
        jsonWebService
          .post(`${URL_WS}/user/update/${getCurrentUser().id}`, data)
          .then((response) => {
            getUserData();
            eventsService.publish(NOTIFICATION_TOAST_EVENT, {
              toastMessage: <Translation message={response.message} />,
              variant: response.status,
            });
          })
          .catch((err) => {}),
      3000
    );
  };
  useEffect(() => {
    if (userDetails && userDetails !== undefined) {
      setFirstName(userDetails.firstName);
      setProfession(userDetails.profession);
      setDescriptionText(userDetails.userDescription);
      setSourceImg(`${URL_WS}/uploads/${userDetails.photo}/${userDetails.photo}`);
      setSourceVid(`${URL_WS}/uploads/${userDetails.consultantVideo}/${userDetails.consultantVideo}`);
    }
  }, [userDetails]);
  console.log('$$sourceIMG', sourceImg);
  console.log('$$sourceVid', sourceVid);
  return (
    <>
      <React.Fragment>
        {loading ? (
          <LoadingSpinner type="big" />
        ) : (
          userDetails && (
            <Page title="TrainingDetail">
              <Container maxWidth="lg" style={{ overflow: 'hidden' }}>
                <Grid sx={{ marginBottom: '1%', marginLeft: '25%', display: 'inline-flex' }}>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="#"
                    startIcon={<Iconify icon="eva:cloud-upload-outline" />}
                    onClick={() => document.getElementById('input').click()}
                    mask="__/__/____"
                    style={{ marginTop: '3rem', backgroundColor: '#86b4ff', color: 'white' }}
                  >
                    Update my photo
                  </Button>
                  <input
                    type="file"
                    id="input"
                    onChange={(e) => handleImportImage(e)}
                    onClick={handleClickImportVideo}
                    style={{ display: 'none' }}
                  />
                </Grid>
                <Stack direction="row" spacing={2} marginBottom={8} marginTop={4}>
                  <Card sx={{ width: 209, height: 209, marginLeft: 0 }}>
                    <CardMedia
                      component="img"
                      image={sourceImg}
                      alt="Your Image"
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Card>

                  <Stack spacing={1}>
                    <Input
                      style={{ marginTop: '2rem' }}
                      type="text"
                      color="black"
                      variant="h2"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                    <Input
                      type="text"
                      color="black"
                      variant="h2"
                      value={profession}
                      onChange={(e) => {
                        setProfession(e.target.value);
                      }}
                    />
                  </Stack>
                </Stack>

                <Typography color={'black'} variant="h3" gutterBottom>
                  Description
                </Typography>
                <Input
                  type="textArea"
                  color="black"
                  multiline
                  variant="h2"
                  style={{ width: '100%' }}
                  value={descriptionText}
                  onChange={(e) => {
                    setDescriptionText(e.target.value);
                  }}
                />

                {/*  */}
                <Grid item xs={4}></Grid>
                {/*  */}
              </Container>
              <center>
                <Grid sx={{ marginBottom: '1%' }}>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="#"
                    startIcon={<Iconify icon="eva:cloud-upload-outline" />}
                    onClick={() => document.getElementById(`inputVideoReader`).click()}
                    mask="__/__/____"
                    style={{ marginBottom: '2rem', marginTop: '3rem', backgroundColor: '#86b4ff', color: 'white' }}
                  >
                    Update my video
                  </Button>
                  <input
                    type="file"
                    id={`inputVideoReader`}
                    onChange={(e) => handleImportVideo(e)}
                    onClick={handleClickImportVid}
                    style={{ display: 'none' }}
                  />
                </Grid>
                <video className="VideoInput_video" width="500" height="340" controls src={sourceVid} />
              </center>
              {/* <VideoPlayer
                src={
                  sourceVid // : `${URL_WS}/uploads/${userDetails.consultantVideo}/${userDetails.consultantVideo}`
                }
              /> */}

              <center>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="eva:cloud-upload-outline" />}
                  onClick={(e) => handleUpdateUserInfo()}
                  mask="__/__/____"
                  style={{ marginBottom: '2rem', marginTop: '6rem', backgroundColor: '#86bc28', color: 'white' }}
                >
                  Save my changes
                </Button>
              </center>
            </Page>
          )
        )}
      </React.Fragment>
    </>
  );
}
