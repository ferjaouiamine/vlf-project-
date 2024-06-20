/* eslint-disable */
import jwt_decode from "jwt-decode";

export class User {
  id = '';
  mail = '';
  role='';
  authenticated: boolean;
  token='';
  refresh_token='';
  firstname='';

  constructor(item) {
    if (item) {
      this.id = item.userId;
      this.mail = item.mail;
      this.role = item.role;
      this.authenticated = item.authenticated;
      this.token = item.token;
      this.refresh_token = item.refresh_token;
      this.firstname = item.firstName;
    }
  }
}

export const getRoleFromToken = (token) => {
  const userToken = jwt_decode(token)
  return userToken.role
}
