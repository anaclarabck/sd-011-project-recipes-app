import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { InProgressContext } from '../../context/RecipeInProgress';
import { createRecipeData, updateStorage } from '../../services/functions';

export default function ButtonFinish(props) {
  const { recipe } = props;
  const { enableFinishBtn } = useContext(InProgressContext);
  const history = useHistory();

  const handleClick = () => {
    const recipeToStorage = createRecipeData(recipe, 'doneRecipes');
    updateStorage('doneRecipes', recipeToStorage, 'add');
    history.push('/receitas-feitas');
  };

  return (
    <Button
      style={ { width: '100%', backgroundColor: '#4B2C0D' } }
      type="button"
      data-testid="finish-recipe-btn"
      // disabled={ !enableFinishBtn }
      onClick={ handleClick }
    >
      Finalizar Receita
    </Button>
  );
}

ButtonFinish.propTypes = {
  idMeal: PropTypes.string,
  strMeal: PropTypes.string,
  strTags: PropTypes.array,
  strArea: PropTypes.string,
  idDrink: PropTypes.string,
  strCategory: PropTypes.string,
  strAlcoholic: PropTypes.string,
  strDrinkThumb: PropTypes.string,
  strDrink: PropTypes.string,
  strMealThumb: PropTypes.string,
}.isRequired;
