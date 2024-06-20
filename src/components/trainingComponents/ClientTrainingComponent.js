/* eslint-disable */
import React, { useEffect, useState } from 'react';
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
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red, blue } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import constants, { URL_WS } from 'src/constants';
import { jsonWebService } from 'src/infrastructure/web-service';
import { getCurrentUser } from 'src/services/user/current-user';
import * as eventsService from 'src/infrastructure/sub-pub-events/eventsSystem';
import { NOTIFICATION_TOAST_EVENT } from 'src/infrastructure/sub-pub-events/eventTypes';

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

export default function ClientTrainingComponent({ chapter, allChapters, chapterIndex, withTest }) {
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
    let vid = document.getElementById('thisVid');
    vid.pause();
    vid.currentTime = 0;
    setShowDetails(false);
  };

  const handleNavigate = () => {
    if (chapterIndex === 0) {
      setShowDetails(true);
    } else {
      checkPreviousChapter(chapterIndex, chapter);
    }
  };

  const checkPreviousChapter = (index, currentChapter) => {
    let previousChapter = allChapters[index - 1];
    const url = `${constants.URL_WS}/result/${previousChapter._id}`;
    jsonWebService
      .get(url, { userId: getCurrentUser().id })
      .then((response) => {
        let res = response.data.result[0]?.result;
        let userId = getCurrentUser().id;
        let resPerUser = response.data.result[0]?.user_id;
        if (userId == resPerUser && res >= constants.MIN_SCORE_TO_PASS_QUIZ) {
          setShowDetails(true);
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
      <Grid item md="4">
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
              Part of the training is testing people who are under the influence of drugs, and after a course in
              Edmonton last November, Part of the training is testing people who are under the influence of drugs, and
              after a course in Edmonton last November, Part of the training is testing people who are under the
              influence of drugs, and after a course in Edmonton last November, Part of the training is testing people
              who are under the influence of drugs, and after a course in Edmonton last November, Part of the training
              is testing people who are under the influence of drugs, and after a course in Edmonton last November,
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="share" onClick={(e) => handleNavigate()}>
              <RemoveRedEyeIcon />
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
          onClose={(e) => closeDetailDialog()}
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="lg"
        >
          <DialogTitle>
            <IconButton
              aria-label="close"
              onClick={() => closeDetailDialog()}
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
            <div style={{ textAlign: 'center' }}>
              <Typography variant="h6" color={'#2F95CA'} sx={{ marginBottom: -3, marginLeft: -7 }}>
                {chapter.chapterName}
              </Typography>
            </div>
            <div style={{ marginBottom: '5px' }}>
              <center>
                {/* <img src="/images/pc.jpg" /> */}
                <video width="500" height="340" id="thisVid" controls>
                  <source src={`${URL_WS}/uploads/${chapter.videoName}/${chapter.videoName}`} type="video/mp4" />
                </video>
              </center>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Part of the training is testing people who are under the influence of drugs, and after a course in
                Edmonton last November, Part of the training is testing people who are under the influence of drugs, and
                after a course in Edmonton last November, Part of the training is testing people who are under the
                influence of drugs, and after a course in Edmonton last November, Part of the training is testing people
                who are under the influence of drugs, and after a course in Edmonton last November,
              </Typography>
            </div>
            {withTest && (
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
                  style={{ marginTop: '1%', backgroundColor: '#86B4FF' }}
                  onClick={(e) => navigate('/dashboard/trainingTest', { replace: true, state: chapter })}
                >
                  Pass the test
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </>
  );
}
