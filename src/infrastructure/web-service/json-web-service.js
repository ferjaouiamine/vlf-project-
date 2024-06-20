/* eslint-disable */
import { NOT_AUTHORIZED, SUCCESS } from './statusTypes';
import { LOGOUT_EVENT } from '../sub-pub-events/eventTypes';
import * as eventsService from '../sub-pub-events/eventsSystem';
import { getCurrentUser, saveCurrentUser, setCurrentUser } from 'src/services/user/current-user';
import { URL_WS } from 'src/constants';
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs';


// let authorisedUrls = [`${URL_WS}/user/refresh`, `${URL_WS}/user/signin`, `${URL_WS}/user/forgotPasswd`, `${URL_WS}/training/uploadvideo`, `${URL_WS}/training`, `${URL_WS}/training/add`, `${URL_WS}/chapter/update/6443b79d537c05e4d0032a13`, `${URL_WS}/chapter`, `${URL_WS}/training/6443b79d537c05e4d0032a12`, `${URL_WS}/training/update/6443b79d537c05e4d0032a12`]

let authorisedUrls = [`${URL_WS}/user/refresh`, `${URL_WS}/user/signin`, `${URL_WS}/user/forgotPasswd`]

export const headerGenerator = () => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'x-access-token': getCurrentUser().token,
});
export const deserialize = (data) => data.json();

export const post = (url, data, headers = headerGenerator(), castType = 'JSON') =>

  new Promise((resolve, reject) => {
    let checkUrl = authorisedUrls.filter(u => u === url)
    if (checkUrl.length == 0){
      let authToken = getCurrentUser().token;
      const userToken = jwt_decode(authToken)
      const isExpired = dayjs.unix(userToken.exp).diff(dayjs()) < 1;
      if(isExpired) {
        refreshToken();
        setTimeout(
          () => fetch(url, {
             method: 'post',
             headers : headerGenerator(),
             body: JSON.stringify(data),
           })
             .then((response) => {
               if (response.status === NOT_AUTHORIZED) {
                   // refreshTokenAndPost()
                 // eventsService.publish(LOGOUT_EVENT, {});
                 // throw new Error('Session expirée', 'Session expirée');
               }
               else{
                 if (response.status === 500) {
                   throw new Error("Erreur d'envoi");
                 }
                 try {
                   if (castType === 'JSON') {
                     return response.json();
                   }
                 } catch (e) {
                   return {};
                 }
               }
             })
             .then((response) => {
               
               if (castType === 'JSON') {
                 const { status } = response;
                 if (status === SUCCESS || "success") {
                   resolve(response);
                 } else {
                   reject(response);
                 }
               }
               if (castType === 'BLOB') resolve(response);
             })
             .catch((err) => {
               reject(err);
             }), 3000);
      }
      else{
         fetch(url, {
             method: 'post',
             headers : headerGenerator(),
             body: JSON.stringify(data),
           })
             .then((response) => {
               if (response.status === NOT_AUTHORIZED) {
                   // refreshTokenAndPost()
                 // eventsService.publish(LOGOUT_EVENT, {});
                 // throw new Error('Session expirée', 'Session expirée');
               }
               else{
                 if (response.status === 500) {
                   throw new Error("Erreur d'envoi");
                 }
                 try {
                   if (castType === 'JSON') {
                     return response.json();
                   }
                 } catch (e) {
                   return {};
                 }
               }
             })
             .then((response) => {
               if (castType === 'JSON') {
                 const { status } = response;
                 if (status === SUCCESS) {
                   resolve(response);
                 } else {
                   reject(response);
                 }
               }
               if (castType === 'BLOB') resolve(response);
             })
             .catch((err) => {
               reject(err);
             });
      }
      
    }
    else {
      fetch(url, {
        method: 'post',
        headers,
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.status === NOT_AUTHORIZED) {
              // refreshTokenAndPost()
            // eventsService.publish(LOGOUT_EVENT, {});
            throw new Error('Session expirée', 'Session expirée');
          }
          else{
            if (response.status === 500) {
              throw new Error("Erreur d'envoi");
            }
            try {
              if (castType === 'JSON') {
                return response.json();
              }
            } catch (e) {
              return {};
            }
          }
        })
        .then((response) => {
          if (castType === 'JSON') {
            const { status } = response;
            if (status === SUCCESS) {
              resolve(response);
            } else {
              reject(response);
            }
          }
          if (castType === 'BLOB') resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    }
    
    
  });

export const get = (url) =>
  new Promise((resolve, reject) => {
    let checkUrl = authorisedUrls.filter(u => u === url)
    if (checkUrl.length == 0){
      let authToken = getCurrentUser().token;
      const userToken = jwt_decode(authToken)
      const isExpired = dayjs.unix(userToken.exp).diff(dayjs()) < 1;
      if(isExpired) {
        refreshToken();
        setTimeout(
          () => fetch(url, {
            method: 'get',
            headers: headerGenerator(),
            //credentials: 'include',
          })
            .then((res) => {
              try {
                return res.json();
              } catch (e) {
                return {};
              }
            })
            .then((response) => {
              if (response.status === NOT_AUTHORIZED) {
                // refreshTokenAndGet()
                // eventsService.publish(LOGOUT_EVENT, {});
                throw new Error('Session expirée');
              }
              resolve(response);
            })
            .catch((err) => {
              if (err instanceof SyntaxError) {
                reject(new Error('server-error'));
              } else {
                reject(err);
              }
            }), 3000);
      }
      else {fetch(url, {
            method: 'get',
            headers: headerGenerator(),
            //credentials: 'include',
          })
            .then((res) => {
              try {
                return res.json();
              } catch (e) {
                return {};
              }
            })
            .then((response) => {
              if (response.status === NOT_AUTHORIZED) {
                // refreshTokenAndGet()
                // eventsService.publish(LOGOUT_EVENT, {});
                throw new Error('Session expirée');
              }
              resolve(response);
            })
            .catch((err) => {
              if (err instanceof SyntaxError) {
                reject(new Error('server-error'));
              } else {
                reject(err);
              }
            });
      }
      
    }
    else {
      fetch(url, {
        method: 'get',
        headers: headerGenerator(),
        //credentials: 'include',
      })
        .then((res) => {
          try {
            return res.json();
          } catch (e) {
            return {};
          }
        })
        .then((response) => {
          if (response.status === NOT_AUTHORIZED) {
            // refreshTokenAndGet()
            // eventsService.publish(LOGOUT_EVENT, {});
            throw new Error('Session expirée');
          }
          resolve(response);
        })
        .catch((err) => {
          if (err instanceof SyntaxError) {
            reject(new Error('server-error'));
          } else {
            reject(err);
          }
        });
    }
    // noinspection JSAnnotator
    
  });

  export const refreshToken = () => {
    let refreshUrl = `${URL_WS}/user/refresh`
    let body = {refreshToken : `${getCurrentUser().refresh_token}`}
    post(refreshUrl, body)
    .then((response) => {
      let newUser = getCurrentUser();
      newUser.token = response.token;
      saveCurrentUser(newUser);
      
    })
    .catch(err => {
      let newUser = getCurrentUser();
      newUser.token = err.token;
      saveCurrentUser(newUser);
    })
  }
