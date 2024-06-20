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
  Typography,
  CardContent,
  CardActions,
  Stack,
  Input,
  Autocomplete,
  createFilterOptions,
  TextField,
  Checkbox,
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

// utils
import Iconify from '../../../components/Iconify';
import { jsonWebService } from 'src/infrastructure/web-service';
import { URL_WS } from 'src/constants';
import * as eventsService from 'src/infrastructure/sub-pub-events/eventsSystem';
import { NOTIFICATION_TOAST_EVENT } from 'src/infrastructure/sub-pub-events/eventTypes';
import Translation from 'src/Translation';
import { AddRelatedQuizes } from 'src/pages/quiz/AddRelatedQuizes';
import LoadingSpinner from 'src/components/Spinner/Spinner';
// import { fShortenNumber } from '../../../utils/formatNumber';
// //
// import SvgIconStyle from '../../../components/SvgIconStyle';
// import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

BlogAddTrainingCard.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number,
};

const useStyles = makeStyles({
  button: {
    backgroundColor: '#2F95CA',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#2F95CA',
      color: '#fff',
      borderColor: '#2F95CA',
    },
  },
  buttonOutlined: {
    backgroundColor: '#fff',
    color: '#2F95CA',
    borderColor: '#2F95CA',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#2F95CA',
      borderColor: '#2F95CA',
    },
  },
});

export default function BlogAddTrainingCard({ setShowAddTrainingForm, handleClose, getTraining, trainingId }) {
  const classes = useStyles();
  const [trainingTitle, setTrainingTitle] = useState('');
  const [trainingDescription, setTrainingDescription] = useState('');
  const [source, setSource] = useState('');
  const [uploadedFile, setUploadedFile] = useState('');
  const [trainingCategory, setTrainingCategory] = useState('');
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

  useEffect(() => {}, []);
  const navigate = useNavigate();

  const closeDialog = () => {
    setTrainingTitle('');
    setTrainingDescription('');
    setDisableAddButton(false);
    setShowAddTrainingForm(false);
    getTraining();
    setSource('');
    setAllQuizes([
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
    handleClose();
  };

  const handleUploadVideo = (fileToUpload) => {
    setLoading(true);
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

  const AddNewTraining = () => {
    let data = {
      chapterName: trainingTitle,
      chapterDescription: trainingDescription,
      training: trainingId,
      videoName: `${trainingTitle}${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}${
        uploadedFile.name
      }`,
      Quiz: allQuizes,
    };
    setDisableAddButton(true);
    handleUploadVideo(uploadedFile);
    jsonWebService
      .post(`${URL_WS}/chapter/add`, data)
      .then((response) => {
        setTrainingTitle('');
        setTrainingDescription('');
        setDisableAddButton(false);
        setShowAddTrainingForm(false);
        getTraining();
        setSource('');
        setAllQuizes([
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
        eventsService.publish(NOTIFICATION_TOAST_EVENT, {
          toastMessage: <Translation message={response.message} />,
          variant: response.status,
        });
        // jsonWebService
        //   .get(`${URL_WS}/training`)
        //   .then((response) => {
        //     setListTraining(response.data.trainings);
        //   })
        //   .catch((err) => {});
        // navigate('/dashboard/trainingPackageManagement', { replace: true });
      })
      .catch((err) => {});
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

  const handleImportVideo = (e) => {
    setUploadedFile(e.target.files[0]);
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
  };

  const handleClickImportVid = (event) => {
    const { target = {} } = event || {};
    target.value = '';
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handleChangeCategory = (e) => {
    setTrainingCategory(e.target.value);
  };

  return (
    <Grid item md="12">
      {/* <Card sx={{ position: 'relative' }}> */}
      {loading ? (
        <LoadingSpinner type="big" />
      ) : (
        <>
          <Grid sx={{ marginBottom: '1%' }}>
            <Input
              type="text"
              value={trainingTitle}
              onChange={(e) => {
                setTrainingTitle(e.target.value);
              }}
              placeholder="Training title"
            />
          </Grid>
          <Grid sx={{ marginBottom: '1%' }}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:cloud-upload-outline" />}
              onClick={() => document.getElementById('input').click()}
              mask="__/__/____"
            >
              Import a video
            </Button>
            <input
              type="file"
              id="input"
              onChange={(e) => handleImportVideo(e)}
              onClick={handleClickImportVid}
              style={{ display: 'none' }}
            />
          </Grid>
          {source && (
            <Grid sx={{ marginBottom: '1%' }}>
              <video className="VideoInput_video" width="500" height="340" controls src={source} />
            </Grid>
          )}
          <Grid sx={{ marginBottom: '1%' }}>
            <Input
              type="text"
              value={trainingDescription}
              onChange={(e) => {
                setTrainingDescription(e.target.value);
              }}
              placeholder="Training description"
              multiline
              sx={{ width: '100%' }}
            />
          </Grid>
          <Typography variant="h6" color={'#86B4FF'} style={{ fontWeight: 'bold', marginTop: '5%' }}>
            Add new quiz
          </Typography>
          <Grid sx={{ marginBottom: '1%' }}>
            <AddRelatedQuizes
              modalForm
              allQuizes={allQuizes}
              onQuizModal={onQuizModal}
              setAllQuizes={setAllQuizes}
              withoutTitle
            />
          </Grid>
        </>
      )}
      {loading ? (
        <LoadingSpinner type="small" />
      ) : (
        <Button
          variant="contained"
          className={classes.button}
          sx={{ marginTop: '1%', marginBottom: '1%' }}
          onClick={() => {
            AddNewTraining();
          }}
          disabled={disableAddButton}
        >
          Add
        </Button>
      )}
      <Button
        className={classes.buttonOutlined}
        variant="outlined"
        sx={{ marginTop: '1%', marginBottom: '1%', marginLeft: '1%' }}
        onClick={(e) => closeDialog()}
      >
        Cancel
      </Button>
      {/* </Card> */}
    </Grid>
  );
}
