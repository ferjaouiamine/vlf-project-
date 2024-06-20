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
  Select,
  MenuItem,
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
import Iconify from '../Iconify';
import ChapterUpdateComponent from './ChapterUpdateComponent';
import { jsonWebService } from 'src/infrastructure/web-service';
import { AddRelatedQuizes } from 'src/pages/quiz/AddRelatedQuizes';
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

const TitleStyle = styled(Link)({
  // height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  fontWeight: 'bold',
});

export default function AdminTrainingComponent({ chapter, getChapters, trainingId }) {
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
  const [chapterTitle, setChapterTitle] = useState(chapter.chapterName);
  const [chapterDescription, setChapterDescription] = useState(chapter.chapterDescription);
  const [sourceVid, setSourceVid] = useState(`${URL_WS}/uploads/${chapter.videoName}/${chapter.videoName}`);
  const [uploadedFileVid, setUploadedFileVid] = useState('');
  const [loading, setLoading] = useState(false);
  const [allQuizes, setAllQuizes] = useState([...chapter.Quiz]);
  const [disabled, setDisabled] = useState(false);

  const closeDetailDialog = () => {
    let vid = document.getElementById(`thisVid${chapter._id}`);
    vid.pause();
    vid.currentTime = 0;
    setAllQuizes(chapter.Quiz);
    setShowDetails(false);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handleUploadVideo = (fileToUpload) => {
    setLoading(true);
    toBase64(fileToUpload)
      .then((res) => {
        const blb = res.split(',');

        jsonWebService
          .post(`${URL_WS}/training/uploadvideo`, {
            name: `${chapterTitle}${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}${
              fileToUpload.name
            }`.replace(/\s/g, ''),
            image: blb[1],
          })
          .then((res) => {
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleUpdateTraining = () => {
    let data;
    let quizData = allQuizes;

    setDisabled(true);

    if (uploadedFileVid !== '') {
      data = {
        chapterDescription: chapterDescription,
        chapterName: chapterTitle,
        createdAt: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
        videoName: `${chapterTitle}${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}${
          uploadedFileVid.name
        }`.replace(/\s/g, ''),
      };
      handleUploadVideo(uploadedFileVid);
    } else {
      data = {
        chapterDescription: chapterDescription,
        chapterName: chapterTitle,
        createdAt: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
      };
    }
    quizData.map((q) => {
      if (q._id) {
        jsonWebService
          .post(`${URL_WS}/quiz/update/${q._id}`, q)
          .then((response) => {})
          .catch((err) => {});
      } else {
        let newQuizToAdd = { ...q, chapterId: chapter._id };
        jsonWebService
          .post(`${URL_WS}/quiz/add`, newQuizToAdd)
          .then((response) => {})
          .catch((err) => {});
      }
    });

    setTimeout(
      () =>
        jsonWebService
          .post(`${URL_WS}/chapter/update/${chapter._id}`, data)
          .then((response) => {
            setDisabled(false);
            getChapters();
            setLoading(false);
            closeDetailDialog();
            eventsService.publish(NOTIFICATION_TOAST_EVENT, {
              toastMessage: <Translation message={response.message} />,
              variant: response.status,
            });
          })
          .catch((err) => {
            setLoading(false);
          }),
      3000
    );
  };

  const onQuizModal = (e) => {
    // addResData({ quizes });
    setAllQuizes([
      {
        statement: {
          statement: '',
          type: '',
          choices: [],
          answers: [],
        },
        response: '',
      },
    ]);
  };

  const deleteChapter = (id) => {
    let data = {
      training: trainingId,
    };
    jsonWebService
      .post(`${URL_WS}/chapter/delete/${id}`, data)
      .then((response) => {
        setShowDeletePost(false);
        getChapters();
      })
      .catch((err) => {
        setShowDeletePost(false);
        getChapters();
      });
  };

  const handleShowDetails = () => {
    setAllQuizes(chapter.Quiz);
    setShowDetails(true);
  };

  return (
    <>
      <Grid item md="3">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="video"
            height="194"
            src={`${URL_WS}/uploads/${chapter.videoName}/${chapter.videoName}`}
            alt="Chapter video"
          />
          <CardHeader
            // action={
            //   <IconButton aria-label="settings">
            //     <MoreVertIcon />
            //   </IconButton>
            // }
            title={chapter.chapterName}
          />
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ maxWidth: '300px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              {chapter.chapterDescription}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="share" onClick={(e) => setShowDeletePost(true)}>
              <DeleteForeverIcon />
            </IconButton>
            <IconButton onClick={(e) => handleShowDetails()} style={{ position: 'absolute', right: '10px' }}>
              <EditIcon />
            </IconButton>
          </CardActions>
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
          {loading && (
            <div style={{ marginTop: '10%', marginBottom: '20%' }}>
              <LoadingSpinner type="big" />
            </div>
          )}
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

          <DialogContent>
            <ChapterUpdateComponent
              chapterTitle={chapterTitle}
              setChapterTitle={setChapterTitle}
              chapterDescription={chapterDescription}
              setChapterDescription={setChapterDescription}
              sourceVid={sourceVid}
              setSourceVid={setSourceVid}
              chapterId={chapter._id}
              setUploadedFileVid={setUploadedFileVid}
              uploadedFileVid={uploadedFileVid}
              closeDetailDialog={closeDetailDialog}
              handleUpdateTraining={handleUpdateTraining}
            />
            <center>
              <Typography
                variant="h4"
                color="#86b4ff"
                style={{
                  marginTop: '3%',
                  marginBottom: '3%',
                  maxWidth: '300px',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                Update the Quiz
              </Typography>
            </center>

            <Grid sx={{ marginBottom: '0%', marginTop: '-5%' }}>
              <AddRelatedQuizes
                modalForm
                allQuizes={allQuizes}
                onQuizModal={onQuizModal}
                setAllQuizes={setAllQuizes}
                withoutTitle
              />
            </Grid>
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
                style={{ marginTop: '1%', backgroundColor: '#149414' }}
                onClick={(e) => handleUpdateTraining()}
                disabled={disabled}
              >
                Update
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </ThemeProvider>

      <ThemeProvider theme={theme}>
        <Dialog
          theme={theme}
          open={showDeletePost}
          // TransitionComponent={Transition}
          keepMounted
          onClose={(e) => setShowDeletePost(false)}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="lg"
        >
          <DialogTitle>
            <TitleStyle to="#" color="inherit" variant="subtitle2" underline="none">
              Do you confirm to delete « {chapter.chapterName} » ?
            </TitleStyle>
          </DialogTitle>
          <DialogContent>
            <div style={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                style={{ marginTop: '1%', marginRight: '3%' }}
                onClick={(e) => setShowDeletePost(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                style={{ marginTop: '1%', backgroundColor: '#b02a37' }}
                onClick={(e) => deleteChapter(chapter._id)}
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
