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
} from '@mui/material';
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
import { URL_WS } from 'src/constants';

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

export default function ClientTrainingPackageComponent({ training, withTest }) {
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

  return (
    <>
      <Grid item md="2">
        <Card
          onClick={(e) => navigate('/dashboard/trainingDetails', { replace: true, state: training })}
          sx={{ maxWidth: 345, maxHeight: 300, marginBottom: '10%', marginLeft: '10%' }}
        >
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
            subheader={`Expert / allFields`}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary" className="priceTag">
              {/* 13,99 $ */}
            </Typography>
          </CardContent>
          {/* description of the training not to show */}
          {/* <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ maxWidth: '300px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              {training.trainingDescription}
            </Typography>
          </CardContent> */}
          {/* <CardActions disableSpacing>
            <IconButton
              aria-label="share"
              onClick={(e) => navigate('/dashboard/trainingDetails', { replace: true, state: training })}
            >
              <RemoveRedEyeIcon />
            </IconButton>
          </CardActions> */}
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
            <div style={{ marginBottom: '5px' }}>
              <center>
                <img width="40%" src={`${URL_WS}/uploads/${training.trainingPhoto}/${training.trainingPhoto}`} />
              </center>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Typography variant="h6" color={'#2F95CA'} sx={{ marginLeft: -7 }}>
                {training.trainingName}
              </Typography>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {training.trainingDescription}
              </Typography>
            </div>
            {/* {withTest && ( */}
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
                style={{ marginTop: '1%', backgroundColor: '#149414' }}
                onClick={(e) => navigate('/dashboard/training', { replace: true, state: training })}
              >
                Begin training
              </Button>
            </div>
            {/* )} */}
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </>
  );
}
