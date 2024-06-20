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
} from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { URL_WS } from 'src/constants';
import BlogUpdateTrainingPackageCard from 'src/sections/@dashboard/blog/BlogUpdateTrainingPackageCard';
import { jsonWebService } from 'src/infrastructure/web-service';
import LoadingSpinner from '../Spinner/Spinner';
import { AddRelatedQuizes } from 'src/pages/quiz/AddRelatedQuizes';

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

export default function AdminTrainingPackageComponent({ training, getTrainingList }) {
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
  const [trainingCategory, setTrainingCategory] = useState(training.trainingCategorie);
  const [trainingPackageHours, setTrainingPackageHours] = useState(training.trainingHours);
  const [trainingTitle, setTrainingTitle] = useState(training.trainingName);
  const [trainingDescription, setTrainingDescription] = useState(training.trainingDescription);
  const [sourceImg, setSourceImg] = useState(`${URL_WS}/uploads/${training.trainingPhoto}/${training.trainingPhoto}`);
  const [uploadedFileImg, setUploadedFileImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [allFinalExamQuizes, setAllFinalExamQuizes] = useState([...training.finalExam]);

  const closeDetailDialog = () => {
    setShowDetails(false);
  };

  const handleChangeCategory = (e) => {
    setTrainingCategory(e.target.value);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handleUploadVideo = (fileToUpload) => {
    toBase64(fileToUpload)
      .then((res) => {
        const blb = res.split(',');

        jsonWebService
          .post(`${URL_WS}/training/uploadvideo`, {
            name: `${trainingTitle}${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}${
              fileToUpload.name
            }`.replace(/\s/g, ''),
            image: blb[1],
          })
          .then((res) => {})
          .catch((err) => {});
      })
      .catch((err) => {});
  };

  const handleUpdateTraining = () => {
    setLoading(true);
    let data;
    let quizData = allFinalExamQuizes;
    if (uploadedFileImg !== '') {
      data = {
        trainingCategorie: trainingCategory,
        trainingDescription: trainingDescription,
        trainingName: trainingTitle,
        trainingPackageHours: trainingPackageHours,
        createdAt: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
        trainingPhoto: `${trainingTitle}${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}${uploadedFileImg.name}`.replace(/\s/g, ''),
      };
      handleUploadVideo(uploadedFileImg);
    } else {
      data = {
        trainingCategorie: trainingCategory,
        trainingDescription: trainingDescription,
        trainingName: trainingTitle,
        trainingPackageHours: trainingPackageHours,
        createdAt: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
      };
    }

    quizData.map((q) => {
      if (q._id) {
        jsonWebService
          .post(`${URL_WS}/finalExam/update/${q._id}`, q)
          .then((response) => {})
          .catch((err) => {});
      } else {
        let newQuizToAdd = { ...q, trainingId: training._id };
        jsonWebService
          .post(`${URL_WS}/finalExam/add`, newQuizToAdd)
          .then((response) => {})
          .catch((err) => {});
      }
    });

    setTimeout(
      () =>
        jsonWebService
          .post(`${URL_WS}/training/update/${training._id}`, data)
          .then((response) => {
            setLoading(false);
            getTrainingList();
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

  const deleteTraining = (id) => {
    jsonWebService
      .post(`${URL_WS}/training/delete/${id}`)
      .then((response) => {
        getTrainingList();
        setShowDeletePost();
      })
      .catch((err) => {
        getTrainingList();
        setShowDeletePost();
      });
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

  return (
    <>
      <Grid item md="2">
        <Card sx={{ marginBottom: '10%', marginLeft: '10%' }}>
          <CardMedia
            component="img"
            height="194"
            image={`${URL_WS}/uploads/${training.trainingPhoto}/${training.trainingPhoto}`}
            alt="Training Img"
          />
          <CardHeader
            // avatar={
            //   <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            //     {training.trainingName.charAt(0).toUpperCase()}
            //   </Avatar>
            // }
            // action={
            //   <IconButton aria-label="settings">
            //     <MoreVertIcon />
            //   </IconButton>
            // }
            title={training.trainingName}
            subheader={'Expert/role'}
          />
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ maxWidth: '300px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              {training.trainingDescription}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="share" onClick={(e) => setShowDeletePost(true)}>
              <DeleteForeverIcon />
            </IconButton>
            <IconButton onClick={(e) => setShowDetails(true)} style={{ position: 'absolute', right: '10px' }}>
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
                <BlogUpdateTrainingPackageCard
                  trainingPackageTitle={trainingTitle}
                  setTrainingPackageTitle={setTrainingTitle}
                  trainingPackageDescription={trainingDescription}
                  setTrainingPackageDescription={setTrainingDescription}
                  sourceImg={sourceImg}
                  setSourceImg={setSourceImg}
                  uploadedFileImg={uploadedFileImg}
                  setUploadedFileImg={setUploadedFileImg}
                  trainingCategory={trainingCategory}
                  setTrainingCategory={setTrainingCategory}
                  trainingId={training._id}
                  trainingPackageHours={trainingPackageHours}
                />
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
                  Update the Exam
                </Typography>
                <Grid sx={{ marginBottom: '0%', marginTop: '-5%' }}>
                  <AddRelatedQuizes
                    allQuizes={allFinalExamQuizes}
                    onQuizModal={onQuizModal}
                    setAllQuizes={setAllFinalExamQuizes}
                    withoutTitle
                  />
                </Grid>
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
                  onClick={(e) => handleUpdateTraining()}
                >
                  Update package
                </Button>
                <Button
                  variant="contained"
                  style={{ marginTop: '1%', backgroundColor: '#dda902' }}
                  onClick={(e) => navigate('/dashboard/trainingManagement', { replace: true, state: training })}
                >
                  Update related training
                </Button>
              </div>
            </DialogContent>
          )}
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
              Do you confirm to delete « {training.trainingName} » ?
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
                onClick={(e) => deleteTraining(training._id)}
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
