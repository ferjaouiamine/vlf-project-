/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  createTheme,
  ThemeProvider,
  Typography,
  Link,
  styled,
  Rating,
  Checkbox,
  ImageList,
  ImageListItem,
  Button,
} from '@mui/material';
import './style.css';
import { jsonWebService } from '../../../infrastructure/web-service';
import { URL_WS } from '../../../constants';

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
  // height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  fontWeight: 'bold',
});
export default function AlertConfirmDeleteUser(props) {
  const { openPopupDeleteUser, setOpenPopupDeleteUser, userToDelete, getUsers } = props;
  const [disableDeleteButton, setDisableDeleteButton] = React.useState(false);
  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });

  const handleClose = () => {
    setOpenPopupDeleteUser(false);
  };

  const deleteUser = () => {
    setDisableDeleteButton(true)
    let data = {
      isBlocked: !userToDelete.isBlocked,
    };
    jsonWebService
      .post(`${URL_WS}/user/update/${userToDelete._id}`, data)
      .then((response) => {
        getUsers();
        setDisableDeleteButton(false)
        setOpenPopupDeleteUser(false);
      })
      .catch((err) => { });
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Dialog
          theme={theme}
          open={openPopupDeleteUser}
          // TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="lg"
        >
          {/* <DialogTitle>{'Référence commande'}</DialogTitle> */}
          <DialogTitle>
            <TitleStyle to="#" color="inherit" variant="subtitle2" underline="none">
              {userToDelete.isBlocked ? `Confirmez-vous le déblocage de l'utilisateur ${userToDelete.label} ?` : `Confirmez-vous le blocage de l'utilisateur ${userToDelete.label} ?`}
            </TitleStyle>
          </DialogTitle>
          <DialogContent>
            <div style={{ textAlign: 'center' }}>
              <Button variant="contained" style={{ marginTop: '1%', marginRight: '3%' }} onClick={handleClose}>
                Annuler
              </Button>
              <Button
                variant="contained"
                style={{ marginTop: '1%', backgroundColor: '#b02a37' }}
                onClick={deleteUser}
                disabled={disableDeleteButton}
              >
          {userToDelete.isBlocked ? `Débloquer` : `Bloquer`}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}
AlertConfirmDeleteUser.propTypes = {
  openPopupDeleteUser: PropTypes.object.isRequired,
  setOpenPopupDeleteUser: PropTypes.object.isRequired,
};

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];
