/* eslint-disable */
import { jsonWebService } from '../infrastructure/web-service';
import {  URL_WS, LOGOUT_WS } from '../constants';

export const LOCAL_STORAGE_LOGGED_IN_KEY = 'authorized';

export const login = (data) => {
  const url = `${URL_WS}/user/signin`;
  return jsonWebService.post(url, data);
};

export const logout = () => {
  const url = `${URL_WS}${LOGOUT_WS}`;
  return fetch(url, {
    method: 'post',
    body: {},
    credentials: 'include',
  })
};

export const getLocalAuth = () => (JSON.parse(localStorage.getItem(LOCAL_STORAGE_LOGGED_IN_KEY)));

export const setLocalAuth = (loggedIn) => {
  localStorage.setItem(LOCAL_STORAGE_LOGGED_IN_KEY, loggedIn);
};

