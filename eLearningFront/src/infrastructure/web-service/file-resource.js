/* eslint-disable */
/* global fetch, URL */

import constants from "../../constants";

export const download = (filepath) => {
  const path = filepath.replace(/\\/g, '/');
  const url = `${constants.URL_WS}${path}`;

  return fetch(
    url,
    {
      method: 'get',
      headers: {
        Accept: 'application/octet-stream',
      },
      // credentials: 'include',
    },
  )
    .then(response => response.blob())
    .then(blob => URL.createObjectURL(blob));
};
