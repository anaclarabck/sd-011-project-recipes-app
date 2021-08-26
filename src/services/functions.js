const NUMBER = 0.5;
export const filterByCategory = (array, filter) => (
  array.filter(({ strCategory }) => strCategory === filter));

export const filter2 = (array, filter) => (
  array.map(({ strCategory }) => strCategory === filter));

export const randomizeArray = (array) => (
  array.sort(() => Math.random() - NUMBER));
