import moment from 'moment/moment';

export const formatDate = (value) => {
  if (!value) return '';
  if (/\d{2}\/\d{2}\/\d{4}/.test(value)) {
    return moment(value, 'DD/MM/Y').format('Y-MM-DD');
  }
  return value;
};
