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
import BlogAddSponsor from './BlogAddSponsor';

// ----------------------------------------------------------------------

export default function PostManagement() {
  const navigate = useNavigate();

  const [sponsorTitle, setSponsorTitle] = useState('');
  const [sponsorDescription, setSponsorDescription] = useState('');
  //   const [sourceVid, setSourceVid] = useState('');
  //   const [uploadedFileVid, setUploadedFileVid] = useState('');
  const [sponsorCategory, setSponsorCategory] = useState('');
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
    let fileName = sponsorTitle;
    toBase64(fileToUpload)
      .then((res) => {
        const blb = res.split(',');
        jsonWebService
          .post(`${URL_WS}/sponsor/uploadMedia`, {
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
  const handleAddNewSponsor = () => {
    setLoading(true);
    let data = {
      sponsorCategory: sponsorCategory,
      sponsorDescription: sponsorDescription,
      sponsorTitle: sponsorTitle,
      //   finalExams: allFinalExamQuizes,
      createdAt: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
      sponsorPhoto: `${sponsorTitle}${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}${
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
      .post(`${URL_WS}/sponsor/add`, data)
      .then((response) => {
        setLoading(false);
        setSponsorTitle('');
        setSponsorDescription('');
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
              Add new Sponsors banner
            </Typography>
            <div style={{ textAlign: 'center' }}>
              <BlogAddSponsor
                sponsorTitle={sponsorTitle}
                setSponsorTitle={setSponsorTitle}
                sponsorCategory={sponsorCategory}
                setSponsorCategory={setSponsorCategory}
                sponsorDescription={sponsorDescription}
                setSponsorDescription={setSponsorDescription}
                sourceImg={sourceImg}
                setSourceImg={setSourceImg}
                uploadedFileImg={uploadedFileImg}
                setUploadedFileImg={setUploadedFileImg}
              />
            </div>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              {loading ? (
                <LoadingSpinner type="small" />
              ) : (
                <Button onClick={handleAddNewSponsor}>Save the Sponsor banner</Button>
              )}
            </Box>
          </React.Fragment>
        </Box>
      </Container>
    </Page>
  );
}
