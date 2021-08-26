import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import ButtonToProgress from './ButtonToProgress';
import ButtonShare from './ButtonShare';
import Recommended from './Recommended';
import RenderVideo from './RenderVideo';
import ButtonFavorite from './ButtonFavorite';
import fetchByFilter from '../services/data';
import { randomizeArray } from '../services/functions';

export default function DetailCard(props) {
  const { recipe } = props;
  const { strCategory, strInstructions } = recipe;
  const { strMeal, strMealThumb, strArea } = recipe;
  const fetchtype = strMeal ? 'thecocktaildb' : 'themealdb';
  const type = strMeal ? 'drinks' : 'meals';
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);

  useEffect(() => {
    const getRecommend = async () => {
      const urlToFetch = `https://www.${fetchtype}.com/api/json/v1/1/search.php?s=`;
      const recipes = await fetchByFilter(urlToFetch);
      setRecommendedRecipes(randomizeArray(recipes[type]));
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
            src={ strMealThumb }
            alt="tumb"
          />
          <Card.Text data-testid="recipe-title">{strMeal}</Card.Text>
          <Card.Text>{strArea}</Card.Text>
          <Card.Text data-testid="recipe-category">{strCategory}</Card.Text>
          <Card.Text style={ { display: 'flex', justifyContent: 'space-around' } }>
            <ButtonFavorite objData={ recipe } />
            <ButtonShare path={ window.location.href } testid="share-btn" />
          </Card.Text>
          {/* <Card.Text>
            { objIngred.map((e, i) => (
              <Card.Text
                data-testid={ `${i}-ingredient-name-and-measure` }
                key={ i }
              >
                { objMeasure[i] ? `${e} - ${objMeasure[i]}` : `${e}`}
              </Card.Text>
            ))}
          </Card.Text> */}
          <h6 data-testid="instructions">{strInstructions}</h6>
          {/* { strYoutube
            && <RenderVideo
              src={ strYoutube }
              title={ `Recipe ${strMeal}` }
              id="video"
            /> } */}
        </Card.Body>
        <Card.Text style={ { margin: '40px', paddingBottom: '60px' } }>
          <Recommended value={ recommendedRecipes } type="meal" />
        </Card.Text>
      </Card>
      <ButtonToProgress data={ recipe } />
    </>
  );
}
