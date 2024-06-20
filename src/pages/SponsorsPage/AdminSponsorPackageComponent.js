/* eslint-disable */
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material
import { styled } from '@mui/material/styles';
import {
  Link,
  Card,
  Grid,
  Button,
  Typography,
  CardContent,
  CardActions,
  createTheme,
  ThemeProvider,
  DialogTitle,
  Dialog,
  DialogContent,
  Container,
} from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { URL_WS } from 'src/constants';
import BlogUpdateTrainingPackageCard from 'src/sections/@dashboard/blog/BlogUpdateTrainingPackageCard';
import { jsonWebService } from 'src/infrastructure/web-service';
import LoadingSpinner from '../../components/Spinner/Spinner';
import { AddRelatedQuizes } from 'src/pages/quiz/AddRelatedQuizes';
import { toBase64 } from 'src/components/MediaCompress';
import AdminUpdateSponsorPackageCards from './AdminUpdateSponsorPackageCards';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Avatar, Box, TextField } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import Page from 'src/components/Page';
import { useEffect } from 'react';
import Translation from 'src/Translation';
import { getCurrentUser } from 'src/services/user/current-user';

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
  commentInput: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#86b4ff',
      },
      '&:hover fieldset': {
        borderColor: '#ffadad',
      },
    },
  },
  sendButton: {
    marginLeft: '1rem',
    backgroundColor: '#b02a37',
    color: '#ffffff',
  },
}));
const TitleStyle = styled(Link)({
  // height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  fontWeight: 'bold',
});

export default function AdminSponsorPackageComponent({ sponsor, getSponsorList }) {
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

  const [showPost, setShowPost] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showSponsor, setShowSponsor] = useState(false);
  const [sponsorCategory, setSponsorCategory] = useState(sponsor.sponsorCategory);
  const [sponsorTitle, setSponsorTitle] = useState(sponsor.sponsorTitle);
  const [sponsorDescription, setSponsorDescription] = useState(sponsor.sponsorDescription);
  const [sourceImg, setSourceImg] = useState(`${URL_WS}/uploads/${sponsor.sponsorPhoto}/${sponsor.sponsorPhoto}`);
  const [uploadedFileImg, setUploadedFileImg] = useState('');
  const [loading, setLoading] = useState(false);
  // comments
  const [name, setName] = useState('');

  const url = window.location.href;
  const pageID = url.substring(url.lastIndexOf('/') + 1);

  const closeDetailDialog = () => {
    setShowDetails(false);
  };

  const handleChangeCategory = (e) => {
    setTrainingCategory(e.target.value);
  };

  const handleUploadMedia = (fileToUpload) => {
    toBase64(fileToUpload)
      .then((res) => {
        const blb = res.split(',');

        jsonWebService
          .post(`${URL_WS}/sponsor/uploadMedia`, {
            name: `${sponsorTitle}${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}${
              fileToUpload.name
            }`.replace(/\s/g, ''),
            image: blb[1],
          })
          .then((res) => {})
          .catch((err) => {});
      })
      .catch((err) => {});
  };
  const getData = () => {
    jsonWebService
      .get(`${URL_WS}/sponsor/${sponsor._id}`)
      .then((response) => {})
      .catch((err) => {});
  };
  const handleUpdateSponsor = () => {
    setLoading(true);
    let data;
    if (uploadedFileImg !== '') {
      data = {
        sponsorCategory: sponsorCategory,
        sponsorTitle: sponsorTitle,
        sponsorDescription: sponsorDescription,
        createdAt: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
        sponsorPhoto: `${sponsorTitle}${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}${
          uploadedFileImg.name
        }`.replace(/\s/g, ''),
      };
      handleUploadMedia(uploadedFileImg);
    } else {
      data = {
        sponsorCategory: sponsorCategory,
        sponsorTitle: sponsorTitle,
        sponsorDescription: sponsorDescription,
        createdAt: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
      };
    }

    // quizData.map((q) => {
    //   if (q._id) {
    //     jsonWebService
    //       .post(`${URL_WS}/finalExam/update/${q._id}`, q)
    //       .then((response) => {})
    //       .catch((err) => {});
    //   } else {
    //     let newQuizToAdd = { ...q, trainingId: training._id };
    //     jsonWebService
    //       .post(`${URL_WS}/finalExam/add`, newQuizToAdd)
    //       .then((response) => {})
    //       .catch((err) => {});
    //   }
    // });

    setTimeout(
      () =>
        jsonWebService
          .post(`${URL_WS}/sponsor/update/${sponsor._id}`, data)
          .then((response) => {
            setLoading(false);
            getSponsorList();
            closeDetailDialog();
            eventsService.publish(NOTIFICATION_TOAST_EVENT, {
              toastMessage: <Translation message={response.message} />,
              variant: response.status,
            });
          })
          .catch((err) => {}),
      3000
    );
  };

  const Sponsor = (id) => {
    jsonWebService
      .post(`${URL_WS}/sponsor/delete/${id}`)
      .then((response) => {
        getSponsorList();
        setShowPost();
      })
      .catch((err) => {
        getSponsorList();
        setShowPost();
      });
  };

  const classes = useStyles();
  return (
    <>
      <Grid>
        <Card sx={{ marginBottom: '10%', height: 'fit-content' }}>
          <center>
            {/* <CardHeader variant="h2" style={{ marginBottom: '2%' }} title={sponsor.sponsorTitle} /> */}
            <CardContent>
              <Typography
                variant="h3"
                color="text.secondary"
                style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
              >
                {sponsor.sponsorTitle}
              </Typography>
              <Typography
                variant="h4"
                color="text.secondary"
                style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
              >
                {sponsor.sponsorDescription}
              </Typography>
            </CardContent>
          </center>

          <CardMedia
            component="img"
            style={{ maxWidth: '100%', maxHeight: '550px', objectFit: 'contain' }}
            image={`${URL_WS}/uploads/${sponsor.sponsorPhoto}/${sponsor.sponsorPhoto}`}
            alt="Sponsor Img"
          />
          {pageID === 'SponsorPackageManagement' && (
            <CardActions disableSpacing>
              <IconButton aria-label="share" onClick={(e) => setShowPost(true)}>
                <DeleteForeverIcon />
              </IconButton>
              <IconButton onClick={(e) => setShowDetails(true)} style={{ position: 'absolute', right: '10px' }}>
                <EditIcon />
              </IconButton>
            </CardActions>
          )}
        </Card>
      </Grid>

      <ThemeProvider theme={theme}>
        <Dialog
          theme={theme}
          open={showDetails}
          // TransitionComponent={Transition}
          keepMounted
          onClose={(e) => closeDetailDialog(false)}
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="lg"
        >
          <DialogTitle>
            <IconButton
              aria-label="close"
              onClick={() => closeDetailDialog(false)}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          {loading ? (
            <div style={{ marginTop: '10%', marginBottom: '20%' }}>
              <LoadingSpinner type="big" />{' '}
            </div>
          ) : (
            <DialogContent>
              <center>
                <Typography
                  variant="h3"
                  color="#86b4ff"
                  style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                >
                  {'Update sponsor'}
                </Typography>
                <AdminUpdateSponsorPackageCards
                  sponsorTitle={sponsorTitle}
                  setSponsorTitle={setSponsorTitle}
                  sponsorDescription={sponsorDescription}
                  setSponsorDescription={setSponsorDescription}
                  sponsorCategory={sponsorCategory}
                  setSponsorCategory={setSponsorCategory}
                  sourceImg={sourceImg}
                  setSourceImg={setSourceImg}
                  uploadedFileImg={uploadedFileImg}
                  setUploadedFileImg={setUploadedFileImg}
                  sponsorId={sponsor._id}
                />
              </center>
              <div style={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  style={{ marginTop: '1%', marginRight: '3%' }}
                  onClick={() => closeDetailDialog()}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  style={{ marginTop: '1%', backgroundColor: '#149414', marginRight: '3%' }}
                  onClick={(e) => handleUpdateSponsor()}
                >
                  Update sponsor
                </Button>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </ThemeProvider>

      <ThemeProvider theme={theme}>
        <Dialog
          theme={theme}
          open={showPost}
          // TransitionComponent={Transition}
          keepMounted
          onClose={(e) => setShowPost(false)}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="lg"
        >
          <DialogTitle>
            <TitleStyle to="#" color="inherit" variant="subtitle2" underline="none">
              Do you confirm to « {sponsor.sponsorTitle} » ?
            </TitleStyle>
          </DialogTitle>
          <DialogContent>
            <div style={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                style={{ marginTop: '1%', marginRight: '3%' }}
                onClick={(e) => setShowPost(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                style={{ marginTop: '1%', backgroundColor: '#b02a37' }}
                onClick={(e) => Sponsor(sponsor._id)}
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </>
  );
}
