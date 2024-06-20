/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider, Link, styled, Typography } from '@mui/material';
import BlogAddTrainingCard from '../blog/BlogAddTrainingCard';

// import Slide from '@mui/material/Slide';

const theme = createTheme({
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.2)',
      },
    },
  },
});

const TitleStyle = styled(Link)({
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  fontWeight: 'bold',
});
export default function AddTrainingForm(props) {
  const { showAddTrainingForm, setShowAddTrainingForm, getTraining, trainingId } = props;

  const handleClose = () => {
    setShowAddTrainingForm(false);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Dialog
          theme={theme}
          open={showAddTrainingForm}
          // TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="lg"
        >
          <DialogTitle>
            {/* <TitleStyle to="#" color="inherit" variant="subtitle2" underline="none">
              Ajouter une nouvelle commande
            </TitleStyle> */}
          </DialogTitle>
          <DialogContent>
            <Typography variant="h6" color={'#2F95CA'} style={{ fontWeight: 'bold' }}>
              Add new chapter
            </Typography>
            <div style={{ textAlign: 'center' }}>
              <BlogAddTrainingCard
                setShowAddTrainingForm={setShowAddTrainingForm}
                handleClose={handleClose}
                getTraining={(e) => getTraining()}
                trainingId={trainingId}
              />
            </div>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}
AddTrainingForm.propTypes = {
  open: PropTypes.object.isRequired,
  setOpen: PropTypes.object.isRequired,
};
