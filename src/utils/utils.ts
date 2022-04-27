import { GuitarTypeFromTheServer, GuitarTypeForClient } from './const';

export const stars = Array.from({ length: 5 }, (v, k) => k + 1);

export const checkIsFull = (rating: number, number: number) => (rating >= number ? '#icon-full-star' : '#icon-star');

export const adaptTypeToClient = (type: string) => {
  switch (type) {
    case GuitarTypeFromTheServer.Acoustic:
      return GuitarTypeForClient.Acoustic;
    case GuitarTypeFromTheServer.Electric:
      return GuitarTypeForClient.Electric;
    case GuitarTypeFromTheServer.Ukulele:
      return GuitarTypeForClient.Ukulele;
    default:
      return GuitarTypeForClient.Unknown;
  }
};

export const formatDate = (date: string) => {
  const currentDate = new Date(date);
  const getDay = currentDate.getDate();
  const getMonth = currentDate.toLocaleString('ru', { month: 'long' });

  return `${getDay} ${getMonth}`;
};
