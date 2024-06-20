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
import Iconify from '../../../components/Iconify';
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
export default function AlertConfirmDeleteUsers(props) {
  const { openPopupDeleteUsers, setOpenPopupDeleteUsers, selectedUsers, getUsers, setSelected } = props;
  const [disableDeleteButton, setDisableDeleteButton] = React.useState(false);
  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });

  const handleClose = () => {
    setOpenPopupDeleteUsers(false);
  };

  const handleDelete =() => {
    let data = {
      usersList : selectedUsers
    };
    setDisableDeleteButton(true)
    jsonWebService
      .post(`${URL_WS}/user/removeall`, data)
      .then((response) => {
        getUsers();
        setSelected([]);
        setDisableDeleteButton(false);
        setOpenPopupDeleteUsers(false);
      })
      .catch((err) => {});
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Dialog
          theme={theme}
          open={openPopupDeleteUsers}
          // TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="lg"
        >
          {/* <DialogTitle>{'Référence commande'}</DialogTitle> */}
          <DialogTitle>
            <TitleStyle to="#" color="inherit" variant="subtitle2" underline="none">
              Confirmez-vous la suppression des utilisateurs ?
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
                onClick={handleDelete}
                disabled={disableDeleteButton}
              >
                Supprimer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}
AlertConfirmDeleteUsers.propTypes = {
  openPopupDeleteUsers: PropTypes.object.isRequired,
  setOpenPopupDeleteUsers: PropTypes.object.isRequired,
};
