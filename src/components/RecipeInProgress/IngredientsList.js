import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { InProgressContext } from '../../context/RecipeInProgress';
import { getItemsFromObject } from '../../services/functions';

export default function IngredientsList(props) {
  const { recipe, category } = props;
  const {
    setLocalStorage,
    ingredientsArray,
    setIngredientsArray,
    measurementsArray,
    setMeasurementsArray,
    updateLocalStorage,
    checkSavedItens,
    setFinishButton,
  } = useContext(InProgressContext);

  useEffect(setLocalStorage, [setLocalStorage]);

  useEffect(() => {
    setFinishButton();
  }, [setFinishButton]);

  useEffect(() => {
    if (recipe) {
      const ingredients = getItemsFromObject(recipe, 'strIngredient', '');
      const measures = getItemsFromObject(recipe, 'strMeasure', ' ');
      setIngredientsArray(ingredients);
      setMeasurementsArray(measures);
    }
  }, [recipe, setIngredientsArray, setMeasurementsArray]);

  return (
    <>
      <p data-testid="recipe-category">{ category }</p>
      <Form>
        { ingredientsArray && ingredientsArray.map((ingredient, index) => (
          <div key={ index } data-testid={ `${index}-ingredient-step` }>
            <Form.Check
              checked={ checkSavedItens(ingredient) }
              id={ `id${index}` }
              name="ingredient"
              onClick={ (e) => { updateLocalStorage(e); } }
              key={ index }
              type="checkbox"
              value={ ingredient }
              label={ `${ingredient} ${
                measurementsArray[index]
                  ? ` - ${measurementsArray[index]}`
                  : ''
              }` }
            />
          </div>
        ))}
      </Form>
    </>
  );
}

IngredientsList.propTypes = {
  recipe: PropTypes.string,
}.isRequired;
