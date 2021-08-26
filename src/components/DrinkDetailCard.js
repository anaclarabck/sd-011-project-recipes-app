import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import ButtonFavorite from './ButtonFavorite';
import ButtonShare from './ButtonShare';
import ButtonToProgress from './ButtonToProgress';
import Recommended from './Recommended';
import RenderVideo from './RenderVideo';

function DrinkDetailCard() {
  const [drinkDetail, setDrinkDetail] = useState([]);
  const [rec, setRec] = useState([]);
  const [min, setMin] = useState([]);

  const path = window.location.pathname.split('/')[2];

  const drinkToDetail = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const foodRecomend = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    const getUrlDrink = async () => {
      const drink = await fetch(`${drinkToDetail}${window.location.pathname
        .split('/')[2]}`);
      const response = drink.json().then((res) => setDrinkDetail(res.drinks[0]));
      return response;
    };

    const getRecomend = async () => {
      const recomend = await fetch(`${foodRecomend}`);
      const resRecom = recomend.json().then((res) => setRec(res.meals));
      const magicN = 20;
      setMin(parseInt(Math.random() * (magicN - 0) + 0, 10));
      return resRecom;
    };

    getRecomend();
    getUrlDrink();
  }, [path]);

  const {
    strAlcoholic,
    strInstructions,
    strDrink,
    strDrinkThumb,
    strYoutube,
  } = drinkDetail;

  const objIngred = Object.entries(drinkDetail).map((e) => {
    if (e[0].includes('strIngredient') && (e[1] !== null)) {
      return e[1];
    }
    return undefined;
  }).filter((i) => i !== undefined);

  const objMeasure = Object.entries(drinkDetail).map((e) => {
    if (e[0].includes('strMeasure') && (e[1] !== null)) {
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
            src={ strDrinkThumb }
            alt="tumb"
          />
          <Card.Text data-testid="recipe-title">{strDrink}</Card.Text>
          <Card.Text data-testid="recipe-category">{strAlcoholic}</Card.Text>
          <Card.Text style={ { display: 'flex', justifyContent: 'space-around' } }>
            <ButtonFavorite objData={ drinkDetail } />
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
          <Card.Text data-testid="instructions">{strInstructions}</Card.Text>
          { strYoutube
          && <RenderVideo
            src={ strYoutube }
            title={ `Recipe ${strDrink}` }
            id="video"
            style={ { width: '50%' } }
          /> }
        </Card.Body>
        <Card.Text style={ { margin: '40px', paddingBottom: '60px' } }>
          <Recommended value={ rec } type="drink" min={ min } />
        </Card.Text>
      </Card>
      <ButtonToProgress data={ drinkDetail } />
    </>
  );
}

export default DrinkDetailCard;
