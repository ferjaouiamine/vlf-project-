/* eslint-disable */
/* global sessionStorage */
import { CURRENT_USER_KEY } from './index';
import { isTruthy } from '../../infrastructure/storage';
import { User } from '../../models/user';
import jwt_decode from "jwt-decode";

export const getCurrentUser = () => {
  const rawUser = sessionStorage.getItem(CURRENT_USER_KEY);
  if (isTruthy(rawUser)) {
    return new User(JSON.parse(rawUser));
  }
  return false;
};
export const setCurrentUser = (user) => {
  sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const saveCurrentUser = (user) => {
  const userToken = jwt_decode(user.token)
  let role = userToken.role
  let firstName = userToken.firstname
  let userId = userToken.id
  let newUser = {...user, role, firstName,userId}
  setCurrentUser(newUser);
};

export const getRoleFromToken = (token) => {
  const userToken = jwt_decode(token)
  return userToken.role
}