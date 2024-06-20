// ----------------------------------------------------------------------
/* eslint-disable */
import { getCurrentUser } from 'src/services/user/current-user';

const account = {
  displayName: getCurrentUser().firstname,
  email: getCurrentUser().role,
  photoURL: `${process.env.PUBLIC_URL}/images/userLoggedIn.png`,
};

export default account;
