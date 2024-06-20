/* eslint-disable */
import React from 'react';

import { Button, TextField } from '@mui/material';
import { jsonWebService } from '../infrastructure/web-service';
import { URL_WS } from '../constants';
import { getCurrentUser } from 'src/services/user/current-user';
import { de } from 'date-fns/locale';
import * as eventsService from 'src/infrastructure/sub-pub-events/eventsSystem';
import { NOTIFICATION_TOAST_EVENT } from 'src/infrastructure/sub-pub-events/eventTypes';
import Translation from 'src/Translation';

// ----------------------------------------------------------------------
// eslint-disable-next-line react/prefer-stateless-function

class ChangePassword extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    isEqual: true,
  };

  componentDidMount() {}

  changeCurrentPassword(e) {
    this.setState({ currentPassword: e.target.value });
  }

  changeNewPassword(e) {
    const { confirmNewPassword } = this.state;
    this.setState({ newPassword: e.target.value });
    confirmNewPassword === e.target.value ? this.setState({ isEqual: true }) : this.setState({ isEqual: false });
  }

  changeConfirmNewPassword(e) {
    const { newPassword } = this.state;
    this.setState({ confirmNewPassword: e.target.value });
    newPassword === e.target.value ? this.setState({ isEqual: true }) : this.setState({ isEqual: false });
  }

  updatePassword() {
    const { currentPassword, newPassword, confirmNewPassword } = this.state;

    const url = `${URL_WS}/user/updatemyprofile/${getCurrentUser().id}`;
    jsonWebService
      .post(url, {
        newpassword: newPassword,
        oldpassword: currentPassword,
      })
      .then((response) => {
        eventsService.publish(NOTIFICATION_TOAST_EVENT, {
          toastMessage: <Translation message={response.message} />,
          variant: response.status,
        });
      })
      .catch((err) => {
        eventsService.publish(NOTIFICATION_TOAST_EVENT, {
          toastMessage: <Translation message={err.message} />,
          variant: err.status === 201 ? 'INFO' : 'FAILURE',
        });
      });
  }

  render() {
    const { currentPassword, newPassword, confirmNewPassword, isEqual } = this.state;
    return (
      <>
        <center>
          <div style={{ marginBottom: '2%' }}>
            <h1>Changer mot de passe</h1>
          </div>
          <div>
            <TextField
              id="currentPassword"
              label="Ancien mot de passe"
              value={currentPassword}
              onChange={(e) => this.changeCurrentPassword(e)}
              variant="outlined"
              style={{ width: '50%', marginBottom: '5%' }}
            />
          </div>
          <div>
            <TextField
              id="newPassword"
              label="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => this.changeNewPassword(e)}
              variant="outlined"
              style={{ width: '50%', marginBottom: '5%' }}
            />
          </div>
          <div style={{ marginBottom: '5%' }}>
            <div>
              <TextField
                id="confirmNewPassword"
                label="Confirmer nouveau mot de passe"
                value={confirmNewPassword}
                onChange={(e) => this.changeConfirmNewPassword(e)}
                variant="outlined"
                style={{ width: '50%', marginBottom: '1%' }}
              />
            </div>
            <div>{!isEqual && <p style={{ color: 'red' }}> La confirmation n'est pas identique</p>}</div>
          </div>
          <div>
            <Button
              disabled={!isEqual || !newPassword || !currentPassword}
              variant="contained"
              onClick={(e) => this.updatePassword()}
            >
              Modifier
            </Button>
          </div>
        </center>
      </>
    );
  }
}

export default ChangePassword;
