import dayjs from 'dayjs';

const formatDate = (date: string): string => {
  if (!date) return '';

  return dayjs(date).format('YYYY/MM/DD HH:mm');
};

export {
  formatDate, // eslint-disable-line import/prefer-default-export
};
