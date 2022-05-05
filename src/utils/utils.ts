import { GuitarTypeFromTheServer, GuitarTypeForClient, MAX_NUMBER_OF_CARDS, FAKE_ARRAY_LENGTH } from './const';
import { mockProduct } from './mock';

export const stars = Array.from({ length: 5 }, (v, k) => k + 1);

export const mockProducts = Array.from({ length: FAKE_ARRAY_LENGTH }, () => mockProduct);

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
  if (isNaN(Date.parse(date))) {
    return 'Дата неизвестна';
  }

  const currentDate = new Date(date);
  const getDay = currentDate.getDate();
  const getMonth = currentDate.toLocaleString('ru', { month: 'long' });

  return `${getDay} ${getMonth}`;
};

export const createQueryGuitarLimit = (pageQuery: number) => {
  const endLimit = pageQuery * MAX_NUMBER_OF_CARDS;
  const startLimit = endLimit - MAX_NUMBER_OF_CARDS;

  return `_start=${startLimit}&_end=${endLimit}`;
};
