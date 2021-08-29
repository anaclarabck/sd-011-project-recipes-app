import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { useHistory } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import ButtonShare from '../components/ButtonShare';
import ButtonFavorite from '../components/ButtonFavorite';
import {
  createRecipeData,
  getItemsFromObject,
  updateStorage,
  updateStorageInProgress } from '../services/functions';

export default function RecipeInProgress({ location }) {
  const { state } = location;
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [usedIngredients, setUsedIngredients] = useState([]);
  const [disabledFinishButton, setDisabledFinishButton] = useState(true);
  const type = state.idMeal ? 'comidas' : 'bebidas';
  const typeEnligsh = state.idMeal ? 'meals' : 'cocktails';
  const id = state.idMeal || state.idDrink;

  useEffect(() => {
    const checkToFinish = (usedIngredients.length !== ingredients.length)
      || usedIngredients.length === 0;
    setDisabledFinishButton(checkToFinish);
  }, [usedIngredients]);

  useEffect(() => {
    setIngredients(getItemsFromObject(state, 'strIngredient', false));
    setMeasures(getItemsFromObject(state, 'strMeasure', ' '));
  }, []);

  const checkSavedIngredients = (ingredient) => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const storageIngredients = Object.values(storage[typeEnligsh][id]);
    return storageIngredients.some((item) => item === ingredient);
  };

  const handleCheckedIngredients = async ({ target }) => {
    const { checked, value } = target;
    await updateStorageInProgress(id, typeEnligsh, value, checked);
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const storageIngredients = Object.values(storage[typeEnligsh][id]);
    setUsedIngredients(storageIngredients);
  };

  const handleButtonFinish = () => {
    const recipeToStorage = createRecipeData(state, 'doneRecipes');
    updateStorage('doneRecipes', recipeToStorage, 'add');
    history.push('/receitas-feitas');
  };

  if (state && ingredients.length > 0 && measures.length > 0) {
    return (
      <Card style={ { width: '90%', margin: '15px auto' } }>
        <Card.Img
          src={ state.strDrinkThumb || state.strMealThumb }
          alt={ state.idDrink || state.idMeal }
          data-testid="recipe-photo"
        />
        <Card.Body>
          <Card.Title>{ state.strDrink || state.strMeal }</Card.Title>
          <Card.Text>
            { state.strAlcoholic }
          </Card.Text>
          <Card.Text style={ { display: 'flex', justifyContent: 'space-around' } }>
            <ButtonShare
              path={ `${window.location.origin}/${type}/${id}` }
              testid="share-btn"
            />
            <ButtonFavorite objData={ state } testid="favorite-btn" />
          </Card.Text>
          <Card.Text>
            <p data-testid="recipe-category">{ state.strCategory }</p>
            <Form>
              { ingredients.map((ingredient, index) => (
                <div key={ index } data-testid={ `${index}-ingredient-step` }>
                  <Form.Check
                    checked={ checkSavedIngredients(ingredient) }
                    id={ `id${index}` }
                    name="ingredient"
                    onChange={ handleCheckedIngredients }
                    key={ index }
                    type="checkbox"
                    value={ ingredient }
                    label={ measures[index]
                      ? `${ingredient} - ${measures[index]}`
                      : ingredient }
                  />
                </div>
              ))}
            </Form>
          </Card.Text>
          <Card.Subtitle>Receita</Card.Subtitle>
          <Card.Text data-testid="instructions">{ state.strInstructions }</Card.Text>
          <Button
            style={ { width: '100%', backgroundColor: '#4B2C0D' } }
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ disabledFinishButton }
            onClick={ handleButtonFinish }
          >
            Finalizar Receita
          </Button>
        </Card.Body>
      </Card>
    );
  }
  return <div>Carregando...</div>;
}

RecipeInProgress.propTypes = {
  location: PropTypes.string,
  state: PropTypes.string,
}.isRequired;
