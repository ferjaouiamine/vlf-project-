import React from 'react';
import { getLocalAuth, setLocalAuth } from '../services/auth';

const DEFAULT_LOGGED_IN = false;
const loggedIn = { value: getLocalAuth() || DEFAULT_LOGGED_IN };

export const setLoggedIn = (newLoggedIn) => {
  setLocalAuth(newLoggedIn)
  loggedIn.value = newLoggedIn;
};

const AuthContext = React.createContext({
  loggedIn,
  setLoggedIn,
});

export default AuthContext;
