export const API_URL_DRINKS_BY_ID = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
export const API_URL_FOODS_BY_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
export const API_URL_ALL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const API_URL_ALL_FOODS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
export const API_URL_RANDOM_FOODS = 'https://www.themealdb.com/api/json/v1/1/random.php';
export const API_URL_RANDOM_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
export const API_URL_FOODS_INGREDIENTS = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
export const API_URL_DRINKS_INGREDIENTS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
export const API_URL_FOODS_INGREDIENTS_FILTER = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
export const API_URL_DRINKS_INGREDIENTS_FILTER = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
export const API_URL_FOODS_LOCATION = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
export const API_URL_FOOD_BY_COUNTRY = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

export async function getDrinkById(id) {
  const request = await fetch(`${API_URL_DRINKS_BY_ID}${id}`);
  const response = await request.json();
  const { drinks } = response;
  return drinks;
}

export async function getFoodById(id) {
  const request = await fetch(`${API_URL_FOODS_BY_ID}${id}`);
  const response = await request.json();
  const { meals } = response;
  return meals;
}

export async function getAllDrinks() {
  const request = await fetch(API_URL_ALL_DRINKS);
  const response = await request.json();
  const { drinks } = response;
  return drinks;
}

export async function getAllFoods() {
  const request = await fetch(API_URL_ALL_FOODS);
  const response = await request.json();
  const { meals } = response;
  return meals;
}
export async function getRandomFood() {
  const request = await fetch(`${API_URL_RANDOM_FOODS}`);
  const response = await request.json();
  const { meals } = response;
  return meals[0].idMeal;
}

export async function getRandomDrink() {
  const request = await fetch(`${API_URL_RANDOM_DRINKS}`);
  const response = await request.json();
  const { drinks } = response;
  return drinks[0].idDrink;
}

export async function getFoodsIngredients() {
  const request = await fetch(`${API_URL_FOODS_INGREDIENTS}`);
  const response = await request.json();
  const { meals } = response;
  return meals;
}

export async function getDrinksIngredients() {
  const request = await fetch(`${API_URL_DRINKS_INGREDIENTS}`);
  const response = await request.json();
  const { drinks } = response;
  return drinks;
}

export async function getFoodsIngredientsFilter(ingredient) {
  const request = await fetch(`${API_URL_FOODS_INGREDIENTS_FILTER}${ingredient}`);
  const response = await request.json();
  const { meals } = response;
  return meals;
}

export async function getDrinksIngredientsFilter(ingredient) {
  const request = await fetch(`${API_URL_DRINKS_INGREDIENTS_FILTER}${ingredient}`);
  const response = await request.json();
  const { drinks } = response;
  return drinks;
}

export async function getFoodByLocation() {
  const request = await fetch(`${API_URL_FOODS_LOCATION}`);
  const response = await request.json();
  const { meals } = response;
  return meals;
}

export async function getFoodByCountry(country) {
  const request = await fetch(`${API_URL_FOOD_BY_COUNTRY}${country}`);
  const response = await request.json();
  const { meals } = response;
  return meals;
}
