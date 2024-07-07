import { getCurrentUser } from './current-user';

export const getUserName = () => getCurrentUser().name;
export const getrole = () => getCurrentUser().role;
export const getAdress = () => getCurrentUser().adress;
export const getMail = () => getCurrentUser().mail;
export const getUserId = () => getCurrentUser().id;
export const getUserToken = () => getCurrentUser.token;
export const getUserRefreshToken = () => getCurrentUser.refresh_token;
