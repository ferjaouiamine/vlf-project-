import { getUserName, getrole, getAdress, getMail, getUserId, getUserToken, getUserRefreshToken } from './user-identity';
import { saveCurrentUser } from './current-user';

export const CURRENT_USER_KEY = 'current-user';
export const USER_INFORMATIONS = 'user-informations';


export const userServices = {
  getUserName: () => getUserName(),
  getrole: () => getrole(),
  getAdress: () => getAdress(),
  getMail: () => getMail(),
  getUserId: () => getUserId(),
  getUserToken: () => getUserToken(),
  getUserRefreshToken: () => getUserRefreshToken(),

  saveCurrentUser: () => saveCurrentUser(),
};
