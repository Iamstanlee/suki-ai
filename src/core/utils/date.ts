import {
  addMinutes,
  format,
  formatDistance,
  isAfter,
  subMinutes,
} from 'date-fns';

export const getTimestamp = () => new Date().toISOString();

export const formatAsDDMMYYAndTime = (date: string | Date) => {
  const value = new Date(date);

  return format(value, 'dd/MM/yy, p');
};

export const formatAsDayMonthYear = (date: string | Date) => {
  const value = new Date(date);

  return format(value, 'dd MMM yyyy');
};

export const formatAsDDMMYY = (date: string | Date) => {
  const value = new Date(date);

  return format(value, 'dd/MM/yy');
};

export const formatAsTimeOnly = (date: string | Date) => {
  const value = new Date(date);

  return format(value, 'p');
};

export const formatAsRelativeFromNow = (date: string | Date) => {
  const value = new Date(date);

  return formatDistance(value, new Date(), { addSuffix: true });
};

export const isFutureDate = (date: string | Date) => {
  return isAfter(new Date(date), new Date());
};

export const getFutureDate = (date: string | Date, minute: number) => {
  return addMinutes(date, minute);
};

export const getElapsedMinutes = (date: string | Date) => {
  return subMinutes(date, new Date().getMinutes()).getMinutes();
};
