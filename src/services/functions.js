const NUMBER = 0.5;
export const filterByCategory = (array, filter) => (
  array.filter(({ strCategory }) => strCategory === filter));

export const filter2 = (array, filter) => (
  array.map(({ strCategory }) => strCategory === filter));

export const shuffleArray = (array) => (
  array.sort(() => Math.random() - NUMBER));

// use notEqual = '' with meals and notEqual = ' ' with drinks
export const getItemsFromObject = (object, key, notEqual) => (
  Object.entries(object)
    .filter((item) => (item[0].includes(key) && item[1] !== notEqual))
    .map((item) => item[1]));
