export const filterByCategory = (array, filter) => (
  array.filter(({ strCategory }) => strCategory === filter));

export const filter2 = (array, filter) => (
  array.map(({ strCategory }) => strCategory === filter));
