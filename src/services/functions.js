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
    .map((item) => item[1])
);

export const getDate = () => {
  const date = new Date();
  return (`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
};

export const createRecipeData = (details, keyStorage) => {
  const detailsStorage = {
    id: details.idDrink || details.idMeal,
    name: details.strMeal || details.strDrink,
    type: details.idMeal ? 'comida' : 'bebida',
    image: details.strMealThumb || details.strDrinkThumb,
    area: details.idMeal ? details.strArea : '',
    category: details.strCategory,
    alcoholicOrNot: details.idMeal ? '' : details.strAlcoholic,
    tags: details.idMeal ? details.strTags.split(',') : [],
  };
  if (keyStorage === 'doneRecipes') {
    detailsStorage.doneDate = getDate();
  }
  return detailsStorage;
};

// set action to 'add' if you want to add an item
// set action to 'remove' if you want to remove an item and use the whole object from the api as valueStorage
// set action to 'create' if you want to create a key storage from zero
export const updateStorage = (keyStorage, valueStorage, action) => {
  const storage = localStorage.getItem(keyStorage);
  const parsedStorage = storage ? JSON.parse(storage) : [];
  if (action === 'add') {
    const updatedStorage = [...parsedStorage, valueStorage];
    localStorage.setItem(keyStorage, JSON.stringify(updatedStorage));
  }
  if (action === 'remove') {
    const updatedStorage = parsedStorage
      .filter((item) => (item.id !== valueStorage.idDrink || valueStorage.idMeal));
    localStorage.setItem(keyStorage, JSON.stringify(updatedStorage));
  }
};
