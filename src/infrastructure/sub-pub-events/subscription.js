/* eslint-disable */
import uuid from '../../utils/uuid';

export default class Subscription {
  cb = () => {
  }

  id = '';

  constructor(cb) {
    if (typeof cb === 'function') this.cb = cb;

    this.id = uuid();
  }
}
