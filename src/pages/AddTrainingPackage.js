/* eslint-disable */
import React, { useState } from 'react';
// @mui
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { Container, Typography, Box, Stepper, Step, StepLabel, Button } from '@mui/material';
// components
import Page from '../components/Page';
import BlogAddTrainingCardStepper from 'src/sections/@dashboard/blog/BlogAddTrainingCardStepper';
import BlogAddTrainingPackageCardStepper from 'src/sections/@dashboard/blog/BlogAddTrainingPackageCardStepper';
import { jsonWebService } from 'src/infrastructure/web-service';
import { URL_WS } from 'src/constants';
import { AddRelatedQuizes } from './quiz/AddRelatedQuizes';
import LoadingSpinner from 'src/components/Spinner/Spinner';

// ----------------------------------------------------------------------

const steps = ['Add new training', 'Add final exam', 'Add a chapter', 'Add quiz'];

export default function AddTrainingPackage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const [trainingTitle, setTrainingTitle] = useState('');
  const [trainingDescription, setTrainingDescription] = useState('');
  const [sourceVid, setSourceVid] = useState('');
  const [uploadedFileVid, setUploadedFileVid] = useState('');
  const [trainingCategory, setTrainingCategory] = useState('');

  const [trainingPackageTitle, setTrainingPackageTitle] = useState('');
  const [trainingPackageHours, setTrainingPackageHours] = useState('');

  const [trainingPackageDescription, setTrainingPackageDescription] = useState('');
  const [sourceImg, setSourceImg] = useState('');
  const [uploadedFileImg, setUploadedFileImg] = useState('');
  const [loading, setLoading] = useState(false);

  const [disableAddButton, setDisableAddButton] = useState(false);
  const [allQuizes, setAllQuizes] = useState([
    {
      statement: {
        statement: '',
        type: '',
        choices: [],
        answers: [],
      },
      response: { value: '' },
    },
  ]);

  const [allFinalExamQuizes, setAllFinalExamQuizes] = useState([
    {
      statement: {
        statement: '',
        type: '',
        choices: [],
        answers: [],
      },
      response: { value: '' },
    },
  ]);
  const isStepOptional = (step) => {
    // return step === 1;
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handleUploadVideo = (fileToUpload, type) => {
    let fileName = type === 'image' ? trainingPackageTitle : trainingTitle;
    toBase64(fileToUpload)
      .then((res) => {
        const blb = res.split(',');
        jsonWebService
          .post(`${URL_WS}/training/uploadvideo`, {
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
  const handleAddNewTraining = () => {
    setLoading(true);
    let data = {
      trainingCategorie: trainingCategory,
      trainingDescription: trainingPackageDescription,
      trainingName: trainingPackageTitle,
      trainingHours: trainingPackageHours,
      finalExams: allFinalExamQuizes,
      createdAt: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
      trainingPhoto: `${trainingPackageTitle}${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}${uploadedFileImg.name}`.replace(/\s/g, ''),
      chapters: [
        {
          chapterName: trainingTitle,
          videoName: `${trainingTitle}${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}${
            uploadedFileVid.name
          }`.replace(/\s/g, ''),
          Quiz: allQuizes,
        },
      ],
    };
    return Promise.all([handleUploadVideo(uploadedFileImg, 'image'), handleUploadVideo(uploadedFileVid, 'video')])
      .then(() => {
        return jsonWebService.post(`${URL_WS}/training/add`, data);
      })
      .then((response) => {
        setLoading(false);
        setTrainingPackageTitle('');
        setTrainingPackageHours('');
        setTrainingPackageDescription('');
        setTrainingTitle('');
        setTrainingDescription('');
        setTrainingCategory('');
        setSourceImg('');
        setSourceVid('');
        handleNext();
        navigate('/dashboard/trainingManagement', { replace: true, state: response.data.training });
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
    <Page title="AddTrainingPackage">
      <Container maxWidth="xl">
        <Box sx={{ width: '100%' }}>
          <div style={{ position: 'fixed', zIndex: 1, width: '95%' }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                  labelProps.optional = <Typography variant="caption">Optional</Typography>;
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </div>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1, position: 'fixed', top: 150 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset} style={{ marginTop: '2%' }}>
                  Add new training package
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}

              {activeStep === 0 && (
                <>
                  <Typography
                    variant="h6"
                    color={'#2F95CA'}
                    style={{ position: 'fixed', fontWeight: 'bold', top: '150px' }}
                  >
                    Add new training package
                  </Typography>
                  <div style={{ textAlign: 'center' }}>
                    <BlogAddTrainingPackageCardStepper
                      trainingPackageTitle={trainingPackageTitle}
                      trainingPackageHours={trainingPackageHours}
                      setTrainingPackageHours={setTrainingPackageHours}
                      setTrainingPackageTitle={setTrainingPackageTitle}
                      trainingPackageDescription={trainingPackageDescription}
                      setTrainingPackageDescription={setTrainingPackageDescription}
                      sourceImg={sourceImg}
                      setSourceImg={setSourceImg}
                      uploadedFileImg={uploadedFileImg}
                      setUploadedFileImg={setUploadedFileImg}
                      trainingCategory={trainingCategory}
                      setTrainingCategory={setTrainingCategory}
                    />
                  </div>
                </>
              )}

              {activeStep === 1 && (
                <AddRelatedQuizes
                  allQuizes={allFinalExamQuizes}
                  onQuizModal={onQuizModal}
                  setAllQuizes={setAllFinalExamQuizes}
                />
              )}

              {activeStep === 2 && (
                <>
                  <Typography
                    variant="h6"
                    color={'#2F95CA'}
                    style={{ position: 'fixed', fontWeight: 'bold', top: '150px' }}
                  >
                    Add new training
                  </Typography>
                  <div style={{ textAlign: 'center' }}>
                    <BlogAddTrainingCardStepper
                      trainingTitle={trainingTitle}
                      setTrainingTitle={setTrainingTitle}
                      trainingDescription={trainingDescription}
                      setTrainingDescription={setTrainingDescription}
                      sourceVid={sourceVid}
                      setSourceVid={setSourceVid}
                      uploadedFileVid={uploadedFileVid}
                      setUploadedFileVid={setUploadedFileVid}
                    />
                  </div>
                </>
              )}

              {/* {activeStep === 2 && (
                <>
                  <Typography
                    variant="h6"
                    color={'#2F95CA'}
                    style={{ position: 'fixed', fontWeight: 'bold', top: '150px' }}
                  >
                    Add related Quiz
                  </Typography>
                  <div style={{ textAlign: 'center' }}>
                    <FormControl style={{ width: '20%', marginBottom: '1%', marginTop: '7%' }}>
                      <InputLabel id="demo-simple-select-label">Component type</InputLabel>
                      <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Component type">
                        <MenuItem value={'Toggle'}>Toggle Button</MenuItem>
                        <MenuItem value={'Text'}>Text</MenuItem>
                        <MenuItem value={'Radio'}>Radio Button</MenuItem>
                        <MenuItem value={'Raiting'}>Raiting</MenuItem>
                      </Select>
                    </FormControl>
                    <div style={{ marginBottom: '3%' }}>
                      <Grid sx={{ marginBottom: '1%' }}>
                        <Input type="text" placeholder="Statement" />
                      </Grid>
                    </div>
                    <div style={{ marginBottom: '3%' }}>
                      <Grid sx={{ marginBottom: '1%' }}>
                        <Input type="text" placeholder="Response" />
                      </Grid>
                    </div>
                    <div>
                      Add new component
                      <IconButton
                        style={{ backgroundColor: '#2F95CA', color: '#fff' }}
                        aria-label="Add new component"
                        onClick={addQuiz}
                        component="label"
                      >
                        <AddIcon />
                      </IconButton>
                    </div>
                  </div>
                </>
              )} */}
              {activeStep === 3 && (
                <AddRelatedQuizes
                  loading={loading}
                  allQuizes={allQuizes}
                  onQuizModal={onQuizModal}
                  setAllQuizes={setAllQuizes}
                />
              )}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>

                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Add new training
                  </Button>
                )}
                {loading ? (
                  <LoadingSpinner type="small" />
                ) : (
                  <Button onClick={activeStep === steps.length - 1 ? handleAddNewTraining : handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Container>
    </Page>
  );
}
