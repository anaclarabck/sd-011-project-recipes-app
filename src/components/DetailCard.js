import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ButtonShare from './ButtonShare';
import ButtonToProgress from './ButtonToProgress';
import ButtonFavorite from './ButtonFavorite';
import Recommended from './Recommended';
import RenderVideo from './RenderVideo';
import fetchByFilter from '../services/data';
import { shuffleArray, getItemsFromObject } from '../services/functions';

export default function DetailCard(props) {
  const { recipe } = props;
  const { strInstructions, strYoutube } = recipe;
  const { strMeal, strMealThumb, strArea, strCategory } = recipe;
  const { strDrink, strDrinkThumb, strAlcoholic } = recipe;
  const fetchtype = strMeal ? 'thecocktaildb' : 'themealdb';
  const type = strMeal ? 'drinks' : 'meals';
  const ingredients = getItemsFromObject(recipe, 'strIngredient', '');
  const measures = getItemsFromObject(recipe, 'strMeasure', ' ');
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);

  useEffect(() => {
    const getRecommend = async () => {
      const urlToFetch = `https://www.${fetchtype}.com/api/json/v1/1/search.php?s=`;
      const recipes = await fetchByFilter(urlToFetch);
      setRecommendedRecipes(shuffleArray(recipes[type]));
    };
    getRecommend();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card style={ { width: '90%', margin: '15px auto' } }>
        <Card.Body>
          <Card.Img
            data-testid="recipe-photo"
            width="150px"
            src={ strMealThumb || strDrinkThumb }
            alt="tumb"
          />
          <Card.Text data-testid="recipe-title">{strMeal || strDrink}</Card.Text>
          <Card.Text>{strArea}</Card.Text>
          <Card.Text data-testid="recipe-category">
            {strCategory || strAlcoholic }
          </Card.Text>
          <Card.Text style={ { display: 'flex', justifyContent: 'space-around' } }>
            <ButtonFavorite objData={ recipe } />
            <ButtonShare path={ window.location.href } testid="share-btn" />
          </Card.Text>
          <Card.Text>
            { ingredients.map((element, index) => (
              <Card.Text
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                { measures[index] ? `${element} - ${measures[index]}` : element }
              </Card.Text>
            ))}
          </Card.Text>
          <h6 data-testid="instructions">{strInstructions}</h6>
          { strYoutube
            && <RenderVideo
              src={ strYoutube }
              title={ `Recipe ${strMeal}` }
              id="video"
            /> }
        </Card.Body>
        <Card.Text style={ { margin: '40px', paddingBottom: '60px' } }>
          <Recommended recommendedRecipes={ recommendedRecipes } type={ type } />
        </Card.Text>
      </Card>
      <ButtonToProgress data={ recipe } />
    </>
  );
}

DetailCard.propTypes = {
  recipe: PropTypes.shape({
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strArea: PropTypes.string,
    strYoutube: PropTypes.string,
  }),
}.isRequired;
