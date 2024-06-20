import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { VIEW_LOGIN } from '../constants';
import AuthContext  from '../contexts/AuthContext';
import { withAuthContext } from './withAuthContext';
import * as eventsService from '../infrastructure/sub-pub-events/eventsSystem';
import { LOGOUT_EVENT } from '../infrastructure/sub-pub-events/eventTypes';

export const authGuard = (ProtectedComponent) => {
  class Guarded extends React.Component {

    // eslint-disable-next-line react/sort-comp
    subscription;

    shouldLougout() {
      const { setLoggedIn, history } = this.props;
      setLoggedIn(false);
      history.push('/');
    }

    componentWillMount() {
      this.subscription = eventsService.subscribe(LOGOUT_EVENT, () => {
        this.shouldLougout();
      });
    }

    componentWillUnmount() {
      eventsService.unsubscribe(LOGOUT_EVENT);
    }

    render() {
      return (
        <AuthContext.Consumer>
          {
            ({ loggedIn: { value } }) => (
              value ? <ProtectedComponent {...this.props} /> : <Redirect to={VIEW_LOGIN} />
            )
          }
        </AuthContext.Consumer>
      );
    }
  }

  return withRouter(withAuthContext(Guarded));
};
