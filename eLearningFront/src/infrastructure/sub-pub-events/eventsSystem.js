/* eslint-disable */
const Subscription = require('./subscription').default;

module.exports = {
  eventStore: {},

  /**
   * @param {string} eventName
   * @param {*} data
   */
  publish(eventName, data = null) {
    console.log('publish')
    if (Array.isArray(this.eventStore[eventName])) {
      this.eventStore[eventName].forEach(sub => sub.cb(data));
    }
  },

  /**
   * @param {string} eventName name of event
   * @param {Function} callback
   */
  subscribe(eventName, callback) {
    console.log('subscribe')
    const sub = new Subscription(callback);
    if (Array.isArray(this.eventStore[eventName])) this.eventStore[eventName].push(sub);
    else {
      this.eventStore[eventName] = [sub];
    }
    return sub;
  },

  /**
   * @param {string} eventName name of event
   */
  unsubscribe(eventName) {
    console.log('unsubscribe')
    delete this.eventStore[eventName];
  },
};
