import React from 'react';
import AuthContext from '../contexts/AuthContext';

export const withAuthContext = Component => props => (
  <AuthContext.Consumer>
    {
      ({
         loggedIn,
         setLoggedIn,
       }) => (
         <Component
           {...props}
           loggedIn={loggedIn}
           setLoggedIn={setLoggedIn}
         />
      )
    }
  </AuthContext.Consumer>
);
