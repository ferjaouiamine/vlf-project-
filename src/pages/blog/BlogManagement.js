/* eslint-disable */
import { useState } from 'react';
import Translation from 'src/Translation';
import { toBase64 } from 'src/components/MediaCompress';
import { URL_WS } from 'src/constants';
import { jsonWebService } from 'src/infrastructure/web-service';
import { getCurrentUser } from 'src/services/user/current-user';

export default function BlogManagement() {
  let userName = getCurrentUser().firstname;
  const [name, setName] = useState(userName);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState([]);

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

  const addNewPost = () => {
    let data = {
      postDescription: postDescription,
      postTitle: postTitle,
      postDate: email,
      postPhoto: `${postTitle}${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}${
        uploadedPhoto.name
      }`.replace(/\s/g, ''),
      userName: name,
    };

    handleUploadMedia(uploadedPhoto, 'image');

    jsonWebService
      .post(`${URL_WS}/post/add`, data)
      .then((response) => {
        setUserName('');
        setPostDescription('');
        setPostTitle('');
        setPostDate('');
        setPostPhoto('');
        setSourcePhoto('');
        // setDisableAddButton(false);
        eventsService.publish(NOTIFICATION_TOAST_EVENT, {
          toastMessage: <Translation message={response.message} />,
          variant: response.status,
        });
        getUsers();
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

    // Save the comment and name to the backend or perform any necessary operations

    // Create a new comment object with name and comment text
    const newComment = { name, comment };

    // Add the new comment to the list of comments
    setComments([...comments, newComment]);

    // Clear the name and comment fields
    setName('');
    setComment('');
  };
  return (
    // <Page title="AddTrainingPackage">
    // <Container maxWidth="xl">
    //   <Box sx={{ width: '100%' }}>
    //     </Box>
    //     </Container>
    //     </Page>
    <div>
      <h1>This is a blog page</h1>

      <form onSubmit={handleCommentSubmit}>
        <label htmlFor="nameField">Your Name:</label>
        <input id="nameField" type="text" value={name} />

        <label htmlFor="commentField">Add a comment:</label>
        <input id="commentField" type="text" value={comment} onChange={handleCommentChange} />

        <button type="submit">Submit</button>
      </form>

      <div>
        <h2>Comments:</h2>
        {comments.map((comment, index) => (
          <div key={index}>
            <p>
              <strong>{userName}</strong> said:
            </p>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
