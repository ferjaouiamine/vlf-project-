/* eslint-disable */
import {
  Button,
  Card,
  CardMedia,
  Container,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  Avatar,
  Box,
  Divider,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Translation from 'src/Translation';
import { toBase64 } from 'src/components/MediaCompress';
import Page from 'src/components/Page';
import { URL_WS } from 'src/constants';
import { jsonWebService } from 'src/infrastructure/web-service';
import { getCurrentUser } from 'src/services/user/current-user';
import ColoredAvatar from './ColoredAvatar';

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

export default function BlogPageDetails() {
  let userName = getCurrentUser().firstname;
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [sender, setSender] = useState('');
  const [postComment, setPostComment] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState([]);
  const { state } = useLocation();
  const handleUploadMedia = (fileToUpload, type) => {
    let fileName = type === 'image' ? firstName : firstName + 'video';
    setLoading(true);
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
          })
          .catch((err) => {
            console.log('====>err', err);
          });
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const getData = () => {
    jsonWebService
      .get(`${URL_WS}/post/${state._id}`)
      .then((response) => {
        setComments(response.data.post.comments);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getData();
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitComment();
    }
  };
  const submitComment = () => {
    if (comment.trim() === '') {
      return;
    }
    let data = {
      sender: userName,
      createdAt: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
      postComment: comment,
      post: state._id,
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

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  const handleCommentSubmit = (event) => {
    event.preventDefault();

    // Save the comments and name to the backend or perform any necessary operations

    // Create a new comment object with name and comment text
    const newComment = { name, comment };

    // Add the new comment to the list of comments
    setComments([...comments, newComment]);

    // Clear the name and comment fields
    setName('');
    setComment('');
  };
  const classes = useStyles();

  return (
    <>
      <Page title="Training management">
        <Container maxWidth="xl">
          <center>
            <Typography variant="h3" color={'black'} marginTop="5%" marginBottom={'1%'} gutterBottom>
              {state.postTitle}
            </Typography>
            <Typography variant="h4" marginBottom={'5%'} color={'black'} gutterBottom>
              Category - {state.postCategory}
            </Typography>
            {state.postPhoto && (
              <Card sx={{ width: 709, height: 709, marginLeft: 0 }}>
                <CardMedia
                  component="img"
                  image={`${URL_WS}/uploads/${state.postPhoto}/${state.postPhoto}`}
                  alt="Your Image"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Card>
            )}
          </center>
          <Typography variant="h5" marginTop="5%" color={'black'} gutterBottom>
            Description :
          </Typography>
          <Typography variant="body1" marginBottom={'5%'} color={'black'} gutterBottom>
            {state.postDescription}
          </Typography>
          <Typography variant="h5" marginBottom="2%" color="black" gutterBottom>
            Comments:
          </Typography>
          <div>
            <div>
              {comments &&
                comments.map((comment, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <ColoredAvatar letter={comment.sender} />
                    <div>
                      <Typography variant="subtitle1" color="black" gutterBottom>
                        {comment.sender} said:
                      </Typography>
                      <Typography variant="body1" color="black" gutterBottom>
                        {comment.postComment}
                      </Typography>
                    </div>
                  </Box>
                ))}
            </div>
            <form onSubmit={handleCommentSubmit}>
              <Typography variant="h6" marginBottom="2%" color="black" gutterBottom>
                Add a new comment:
              </Typography>
              <TextField
                style={{ borderColor: 'red' }}
                id="commentField"
                label="Add your comment ..."
                className={classes.commentInput}
                // multiline
                rows={3}
                onKeyPress={handleKeyPress}
                variant="outlined"
                value={comment}
                onChange={handleCommentChange}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <Button
                      variant="contained"
                      style={{ marginLeft: '1rem', backgroundColor: '#ffadad', color: '#ffffff' }}
                      onClick={() => submitComment()}
                    >
                      Send
                    </Button>
                  ),
                }}
              />
            </form>
          </div>
        </Container>{' '}
      </Page>
    </>
  );
}
