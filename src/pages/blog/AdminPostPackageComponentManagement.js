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
import AdminUpdatePostPackageCards from './AdminUpdatePostPackageCards';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Avatar, Box, TextField } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import Page from 'src/components/Page';
import ColoredAvatar from './ColoredAvatar';
import CommentInput from './CommentInput';
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

export default function AdminPostPackageComponent({ post, getPostList }) {
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
  const [showPost, setShowPost] = useState(false);
  const [postCategory, setPostCategory] = useState(post.postCategory);
  const [postTitle, setPostTitle] = useState(post.postTitle);
  const [postDescription, setPostDescription] = useState(post.postDescription);
  const [sourceImg, setSourceImg] = useState(`${URL_WS}/uploads/${post.postPhoto}/${post.postPhoto}`);
  const [uploadedFileImg, setUploadedFileImg] = useState('');
  const [loading, setLoading] = useState(false);
  // comments
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post.comments);
  //   const [allComments, setAllComments] = useState([...post.comment]);

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
          .post(`${URL_WS}/post/uploadMedia`, {
            name: `${postTitle}${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}${
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
      .get(`${URL_WS}/post/${post._id}`)
      .then((response) => {
        setComments(response.data.post.comments);
      })
      .catch((err) => {});
  };
  const handleUpdatePost = () => {
    setLoading(true);
    let data;
    if (uploadedFileImg !== '') {
      data = {
        postCategory: postCategory,
        postTitle: postTitle,
        postDescription: postDescription,
        createdAt: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
        postPhoto: `${postTitle}${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}${
          uploadedFileImg.name
        }`.replace(/\s/g, ''),
      };
      handleUploadMedia(uploadedFileImg);
    } else {
      data = {
        postCategory: postCategory,
        postTitle: postTitle,
        postDescription: postDescription,
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
          .post(`${URL_WS}/post/update/${post._id}`, data)
          .then((response) => {
            setLoading(false);
            getPostList();
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

  const Post = (id) => {
    jsonWebService
      .post(`${URL_WS}/post/delete/${id}`)
      .then((response) => {
        getPostList();
        setShowPost();
      })
      .catch((err) => {
        getPostList();
        setShowPost();
      });
  };
  let userName = getCurrentUser().firstname;
  const submitComment = () => {
    if (comment.trim() === '') {
      return;
    }
    let data = {
      sender: userName,
      createdAt: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
      postComment: comment,
      post: post._id,
    };

    jsonWebService
      .post(`${URL_WS}/comment/add`, data)
      .then((response) => {
        getData();
        setComment('');
        // setDisableAddButton(false);
        eventsService.publish(NOTIFICATION_TOAST_EVENT, {
          toastMessage: <Translation message={response.message} />,
          variant: response.status,
        });
        // getComments();
        // setAlert({ open: true, type: 'success', message: 'Post added successfully' });
      })
      .catch((err) => {});
  };
  const deleteComment = (id) => {
    jsonWebService
      .post(`${URL_WS}/comment/delete/${id}`)
      .then((response) => {
        getPostList();
        getData();
      })
      .catch((err) => {
        getPostList();
        getData();
      });
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const newComment = { name, comment };
    setComments([...comments, newComment]);
    setName('');
    setComment('');
  };
  const classes = useStyles();
  return (
    <>
      <Grid container>
        <Grid item md={3}>
          <Grid>
            <Card sx={{ marginBottom: '10%', height: 'fit-content' }}>
              <center>
                {/* <CardHeader variant="h2" style={{ marginBottom: '2%' }} title={post.postTitle} /> */}
                <CardContent>
                  <Typography
                    variant="h3"
                    color="text.secondary"
                    style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                  >
                    {post.postTitle}
                  </Typography>
                  <Typography
                    variant="h4"
                    color="text.secondary"
                    style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                  >
                    {post.postCategory}
                  </Typography>
                </CardContent>
              </center>

              <CardMedia
                component="img"
                style={{ maxWidth: '100%', maxHeight: '550px', objectFit: 'contain' }}
                image={`${URL_WS}/uploads/${post.postPhoto}/${post.postPhoto}`}
                alt="Post Img"
              />
              <center>
                {pageID === 'PostPackageManagement' ? (
                  <CardActions disableSpacing>
                    <IconButton aria-label="share" onClick={(e) => setShowPost(true)}>
                      <DeleteForeverIcon />
                    </IconButton>
                    <IconButton onClick={(e) => setShowDetails(true)} style={{ position: 'absolute', right: '10px' }}>
                      <EditIcon />
                    </IconButton>
                  </CardActions>
                ) : (
                  <Button
                    variant="contained"
                    style={{ marginTop: '3%', marginBottom: '3%', backgroundColor: '#b02a37' }}
                    onClick={(e) => navigate('/dashboard/BlogPageDetails', { replace: true, state: post })}
                  >
                    Read More ...
                  </Button>
                )}
              </center>
            </Card>
          </Grid>
        </Grid>
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
                  {'Update post'}
                </Typography>
                <AdminUpdatePostPackageCards
                  postTitle={postTitle}
                  setPostTitle={setPostTitle}
                  postDescription={postDescription}
                  setPostDescription={setPostDescription}
                  postCategory={postCategory}
                  setPostCategory={setPostCategory}
                  sourceImg={sourceImg}
                  setSourceImg={setSourceImg}
                  uploadedFileImg={uploadedFileImg}
                  setUploadedFileImg={setUploadedFileImg}
                  postId={post._id}
                />
                <Page title="Training management">
                  <Container maxWidth="xl">
                    <Typography variant="h5" marginBottom="3%" marginTop="3%" color="#86b4ff" gutterBottom>
                      Comments:
                    </Typography>
                    <div>
                      <div>
                        {comments &&
                          comments.map((comment, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                              <ColoredAvatar letter={comment.sender} />
                              <Typography
                                fontWeight={700}
                                marginLeft={'1%'}
                                marginRight={'0.5%'}
                                variant="subtitle1"
                                color="black"
                                gutterBottom
                              >
                                {comment.sender} said :
                              </Typography>
                              <Typography marginRight="1%" variant="body1" color="black" gutterBottom>
                                {comment.postComment}
                              </Typography>
                              <IconButton aria-label="delete" onClick={(e) => deleteComment(comment._id)}>
                                <DeleteForeverIcon />
                              </IconButton>{' '}
                            </Box>
                          ))}
                      </div>
                      <form onSubmit={handleCommentSubmit}>
                        <Typography variant="h6" marginBottom="2%" color="#86b4ff" gutterBottom>
                          Add a new comment:
                        </Typography>
                        <CommentInput
                          comment={comment}
                          handleCommentChange={handleCommentChange}
                          submitComment={submitComment}
                        />
                      </form>
                    </div>
                  </Container>
                </Page>
                {/* <Typography
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
                </Grid> */}
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
                  onClick={(e) => handleUpdatePost()}
                >
                  Update post
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
              Do you confirm to « {post.postTitle} » ?
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
                onClick={(e) => Post(post._id)}
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
