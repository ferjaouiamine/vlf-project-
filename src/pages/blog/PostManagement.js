/* eslint-disable */
import React, { useState } from 'react';
// @mui
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { Container, Typography, Box, Stepper, Step, StepLabel, Button } from '@mui/material';
// components
import Page from '../../components/Page';
import { jsonWebService } from 'src/infrastructure/web-service';
import { URL_WS } from 'src/constants';
import LoadingSpinner from 'src/components/Spinner/Spinner';
import { toBase64 } from 'src/components/MediaCompress';
import BlogAddPost from './BlogAddPost';

// ----------------------------------------------------------------------

export default function PostManagement() {
  const navigate = useNavigate();

  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  //   const [sourceVid, setSourceVid] = useState('');
  //   const [uploadedFileVid, setUploadedFileVid] = useState('');
  const [postCategory, setPostCategory] = useState('');
  const [sourceImg, setSourceImg] = useState('');
  const [uploadedFileImg, setUploadedFileImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [disableAddButton, setDisableAddButton] = useState(false);
  //   const [allFinalExamQuizes, setAllFinalExamQuizes] = useState([
  //     {
  //       statement: {
  //         statement: '',
  //         type: '',
  //         choices: [],
  //         answers: [],
  //       },
  //       response: { value: '' },
  //     },
  //   ]);

  const handleUploadVideo = (fileToUpload, type) => {
    let fileName = postTitle;
    toBase64(fileToUpload)
      .then((res) => {
        const blb = res.split(',');
        jsonWebService
          .post(`${URL_WS}/post/uploadMedia`, {
            name: `${fileName}${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}${
              fileToUpload.name
            }`.replace(/\s/g, ''),
            image: blb[1],
          })
          .then((res) => {})
          .catch((err) => {});
      })
      .catch((err) => {});
  };
  const handleAddNewPost = () => {
    setLoading(true);
    let data = {
      postCategory: postCategory,
      postDescription: postDescription,
      postTitle: postTitle,
      //   finalExams: allFinalExamQuizes,
      createdAt: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
      postPhoto: `${postTitle}${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}${
        uploadedFileImg.name
      }`.replace(/\s/g, ''),
      //   chapters: [
      //     {
      //       chapterName: trainingTitle,
      //       videoName: `${trainingTitle}${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}${
      //         uploadedFileVid.name
      //       }`.replace(/\s/g, ''),
      //       Quiz: allQuizes,
      //     },
      //   ],
    };
    handleUploadVideo(uploadedFileImg, 'image');

    jsonWebService
      .post(`${URL_WS}/post/add`, data)
      .then((response) => {
        setLoading(false);
        setPostTitle('');
        setPostDescription('');
        setSourceImg('');
        // navigate('/dashboard/trainingManagement', { replace: true, state: response.data.training });
        eventsService.publish(NOTIFICATION_TOAST_EVENT, {
          toastMessage: <Translation message={response.message} />,
          variant: response.status,
        });
      })
      .catch((err) => {
        // Handle errors
      });
  };

  ////////////////////: add multiple quizes

  return (
    <Page title="AddTrainingPackage">
      <Container maxWidth="xl">
        <Box sx={{ width: '100%' }}>
          <React.Fragment>
            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
            <Typography variant="h6" color={'#2F95CA'} style={{ position: 'fixed', fontWeight: 'bold', top: '150px' }}>
              Add new post
            </Typography>
            <div style={{ textAlign: 'center' }}>
              <BlogAddPost
                postTitle={postTitle}
                setPostTitle={setPostTitle}
                postCategory={postCategory}
                setPostCategory={setPostCategory}
                postDescription={postDescription}
                setPostDescription={setPostDescription}
                sourceImg={sourceImg}
                setSourceImg={setSourceImg}
                uploadedFileImg={uploadedFileImg}
                setUploadedFileImg={setUploadedFileImg}
              />
            </div>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              {loading ? <LoadingSpinner type="small" /> : <Button onClick={handleAddNewPost}>Save the post</Button>}
            </Box>
          </React.Fragment>
        </Box>
      </Container>
    </Page>
  );
}
