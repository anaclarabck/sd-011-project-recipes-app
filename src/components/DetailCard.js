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
  const { id, fetchType } = props;
  const [details, setDetails] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);

  const getRecommendedRecipes = async () => {
    const fetchtypeRecommend = fetchType === 'themealdb' ? 'thecocktaildb' : 'themealdb';
    const urlToFetch = `https://www.${fetchtypeRecommend}.com/api/json/v1/1/search.php?s=`;
    const recommendedRecipesFromApi = await fetchByFilter(urlToFetch);
    setRecommendedRecipes(shuffleArray(Object.values(recommendedRecipesFromApi)[0]));
  };

  const getDetails = async () => {
    const urlToFetch = `https://www.${fetchType}.com/api/json/v1/1/lookup.php?i=${id}`;
    const detailsFromApi = await fetchByFilter(urlToFetch);
    const detailsObject = Object.values(detailsFromApi)[0][0];
    setIngredients(getItemsFromObject(detailsObject, 'strIngredient', ''));
    setMeasures(getItemsFromObject(detailsObject, 'strMeasure', ' '));
    setDetails(detailsObject);
  };

  useEffect(() => {
    getRecommendedRecipes();
    getDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (details) {
    return (
      <>
        <Card style={ { width: '90%', margin: '15px auto' } }>
          <Card.Body>
            <Card.Img
              data-testid="recipe-photo"
              width="150px"
              src={ details.strMealThumb || details.strDrinkThumb }
              alt="tumb"
            />
            <Card.Text data-testid="recipe-title">
              {details.strMeal || details.strDrink}
            </Card.Text>
            <Card.Text>{details.strArea}</Card.Text>
            <Card.Text data-testid="recipe-category">
              {details.strCategory || details.strAlcoholic }
            </Card.Text>
            <Card.Text style={ { display: 'flex', justifyContent: 'space-around' } }>
              <ButtonFavorite objData={ details } />
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
            <h6 data-testid="instructions">{details.strInstructions}</h6>
            { details.strYoutube
              && <RenderVideo
                src={ details.strYoutube }
                title={ `Recipe ${details.strMeal}` }
                id="video"
              /> }
          </Card.Body>
          <Card.Text style={ { margin: '40px', paddingBottom: '60px' } }>
            <Recommended
              recommendedRecipes={ recommendedRecipes }
              fetchType={ fetchType }
            />
          </Card.Text>
        </Card>
        <ButtonToProgress data={ details } />
      </>
    );
  }
  return <div>Carregando...</div>;
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
