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
  Container,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import moment from 'moment';
import constants, { URL_WS } from 'src/constants';
import { useLocation } from 'react-router-dom';
import Page from 'src/components/Page';
import './home.scss';
import { ClientChapterComponent } from 'src/components/trainingComponents/ClientChapterComponent';
import { jsonWebService } from 'src/infrastructure/web-service';
import * as eventsService from 'src/infrastructure/sub-pub-events/eventsSystem';
import { NOTIFICATION_TOAST_EVENT } from 'src/infrastructure/sub-pub-events/eventTypes';
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

const TitleStyle = styled(Link)({
  // height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  fontWeight: 'bold',
});

export default function ClientTrainingDetails({ withTest }) {
  const { state } = useLocation();

  let chapters = state.chapters;
  let finalExam = state;
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
  const closeDetailDialog = () => {
    setShowDetails(false);
  };

  const handleNavigate = () => {
    let previousChapter = chapters[chapters.length - 1];
    const url = `${constants.URL_WS}/result/${previousChapter._id}`;
    jsonWebService
      .get(url, { userId: getCurrentUser().id })
      .then((response) => {
        let userId = getCurrentUser().id;
        let res = response.data.result[0]?.result;
        let resPerUser = response.data.result[0]?.user_id;
        if (userId == resPerUser && res >= constants.MIN_SCORE_TO_PASS_QUIZ) {
          navigate('/dashboard/trainingExam', { replace: true, state: state });
        } else {
          eventsService.publish(NOTIFICATION_TOAST_EVENT, {
            toastMessage: `Please finish the previous chapter with a score more than ${constants.MIN_SCORE_TO_PASS_QUIZ} %`,
            variant: 'INFO',
          });
        }
      })
      .catch((err) => {});
  };

  return (
    <>
      <React.Fragment>
        <Page title="TrainingDetail">
          <Container maxWidth="xl" style={{ overflow: 'hidden' }}>
            <div className="parent">
              <div className="div2">
                <div className="learningRafiki">
                  <img
                    style={{ width: 400, height: 400, borderRadius: 400 / 2 }}
                    width="100%"
                    src={`${URL_WS}/uploads/${state.trainingPhoto}/${state.trainingPhoto}`}
                  />
                </div>
              </div>
              <div className="routeStyle routeStylePosition">Dashboard / Training Details</div>
              <div className="div3">
                <div>
                  <Typography color={'#2F95CA'} className="chapterName" sx={{}}>
                    {state.trainingCategorie}
                  </Typography>
                  <Typography variant="h6" color={'#2F95CA'} className="textheader1" sx={{ marginBottom: 7 }}>
                    {state.trainingName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {state.trainingDescription}
                  </Typography>{' '}
                  {state.trainingHours && (
                    <div
                      className="trainingHours"
                      style={{ marginTop: '2%', marginBottom: '2%', width: '100%', display: 'inline-flex' }}
                    >
                      <AccessTimeIcon style={{ marginTop: '6%' }} />
                      <div style={{ marginTop: '6%', marginLeft: '1%' }}> {state.trainingHours} Hours</div>
                    </div>
                  )}
                  {/* {withTest && ( */}
                  {/* with test to be checked later */}
                  <br />
                  <ClientChapterComponent finalExam={finalExam} chapters={chapters} />
                  <div
                    role="presentation"
                    onClick={() => handleNavigate()}
                    className="examBanner"
                    onKeyDown={() => handleNavigate()}
                  >
                    <div className="chapterText" style={{ color: '#86b4ff' }}>
                      Final Exam
                    </div>
                  </div>
                  {/* )} */}
                </div>
              </div>
            </div>
          </Container>
        </Page>
      </React.Fragment>
    </>
  );
}
