/* eslint-disable */
import { Navigate } from 'react-router-dom';
import constants from './constants';

let pageName = window.location.href.split('/').pop();

export const LOCAL_STORAGE_LOGGED_IN_KEY = 'authorized';

export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem(LOCAL_STORAGE_LOGGED_IN_KEY);
  // !constants.ALLOWED_OPEN_PAGES.includes(pageName)
  if (user === 'false') {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};
