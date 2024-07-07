/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider, Link, styled, Typography } from '@mui/material';
import './style.css';
import { Box } from '@mui/system';
import BlogAddUserCard from '../blog/BlogAddUserCard';
import AddUserFormImage from './AddUserFormImage';

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
export default function AddUserForm(props) {
  const { showAddUserForm, setShowAddUserForm, getUsers } = props;

  const handleClose = () => {
    setShowAddUserForm(false);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Dialog
          theme={theme}
          open={showAddUserForm}
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
            <Box>
              <center>
                <AddUserFormImage />
              </center>
            </Box>

            <div style={{ textAlign: 'center' }}>
              <Typography variant="h4" color={'#2F95CA'} sx={{ marginBottom: 5, marginTop: -12, marginLeft: -7 }}>
                Add new user
              </Typography>
              <BlogAddUserCard
                setShowAddUserForm={setShowAddUserForm}
                handleClose={handleClose}
                getUsers={(e) => getUsers()}
              />
            </div>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}
AddUserForm.propTypes = {
  open: PropTypes.object.isRequired,
  setOpen: PropTypes.object.isRequired,
};
