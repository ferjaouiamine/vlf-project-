/* eslint-disable */
/* global sessionStorage */

export const getItem = name => sessionStorage.getItem(name);

export const isTruthy = item => item && item !== 'undefined' && item !== 'null';
