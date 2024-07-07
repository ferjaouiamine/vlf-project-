import moment from 'moment';
import 'moment/locale/fr';
// without this line it didn't work
moment.locale('fr');

const now = moment();
export const getComponentCache = componentName => (JSON.parse(localStorage.getItem(componentName)));

export const setComponentCache = (state, componentName) => (
  localStorage.setItem(componentName, JSON.stringify(state)));
