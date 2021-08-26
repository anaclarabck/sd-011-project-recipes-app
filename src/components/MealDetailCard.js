import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import ButtonToProgress from './ButtonToProgress';
import ButtonShare from './ButtonShare';
import Recommended from './Recommended';
import RenderVideo from './RenderVideo';
import ButtonFavorite from './ButtonFavorite';

function MealDetailCard() {
  const [mealDetail, setMealDetail] = useState([]);
  const [rec, setRec] = useState([]);
  const [min, setMin] = useState([]);

  const path = window.location.pathname.split('/')[1] === 'comidas';
  const foodToDetail = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const drinkRecommend = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    const getUrlMeal = async () => {
      const meal = await fetch(`${foodToDetail}${window.location.pathname
        .split('/')[2]}`);
      const response = meal.json().then((res) => setMealDetail(res.meals[0]));
      return response;
    };

    const getRecomend = async () => {
      const recomend = await fetch(`${drinkRecommend}`);
      const resRecom = recomend.json().then((res) => setRec(res.drinks));
      const magicN = 20;
      setMin(parseInt(Math.random() * (magicN - 0) + 0, 10));
      return resRecom;
    };

    getRecomend();
    getUrlMeal();
  }, [path]);

  const {
    // idMeal,
    strArea,
    strCategory,
    strInstructions,
    strMeal,
    strMealThumb,
    strYoutube,
  } = mealDetail;

  // console.log((rec.meals));

  const objIngred = Object.entries(mealDetail).map((e) => {
    if (e[0].includes('strIngredient') && e[1] !== '') {
      return e[1];
    }
    return undefined;
  }).filter((i) => i !== undefined);

  const objMeasure = Object.entries(mealDetail).map((e) => {
    if (e[0].includes('strMeasure') && e[1] !== ' ') {
      return e[1];
    }
    return undefined;
  }).filter((i) => i !== undefined);

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
            <ButtonFavorite objData={ mealDetail } />
            <ButtonShare path={ window.location.href } testid="share-btn" />
          </Card.Text>
          <Card.Text>
            { objIngred.map((e, i) => (
              <Card.Text
                data-testid={ `${i}-ingredient-name-and-measure` }
                key={ i }
              >
                { objMeasure[i] ? `${e} - ${objMeasure[i]}` : `${e}`}
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
          <Recommended value={ rec } type="meal" min={ min } />
        </Card.Text>
      </Card>
      <ButtonToProgress data={ mealDetail } />
    </>
  );
}

export default MealDetailCard;
