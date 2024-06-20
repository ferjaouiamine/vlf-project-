import { formatDate } from './parseDate';

export const getTodayDateWithTime = () => `${formatDate(new Date().toLocaleDateString())} 00:00:00`;
export const getTodayDate = () => `${formatDate(new Date().toLocaleDateString())}`;
