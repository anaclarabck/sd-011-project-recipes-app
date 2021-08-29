import React from 'react';
import { useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Recommended({ recommendedRecipes, fetchType }) {
  const MAX = 6;
  const history = useHistory();
  const sixCards = recommendedRecipes.map((recipe) => recipe).slice(0, MAX);
  const settings = {
    arrows: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };
  const handleClick = (recipe) => {
    const type = fetchType === 'themealdb' ? 'comidas' : 'bebidas';
    const id = recipe[1].idMeal || recipe[1].idDrink;
    history.push({
      pathname: `/${type}/${id}`,
      state: { id, fetchType } });
  };

  return (
    <div style={ { textAlign: '-webkit-center' } }>
      <Slider { ...settings }>
        { Object.entries(sixCards).map((recipe, index) => (
          <div
            data-testid={ `${index}-recomendation-card` }
            key={ index }
            role="button"
            tabIndex="0"
            onKeyPress={ () => handleClick(recipe) }
            onClick={ () => handleClick(recipe) }
          >
            <img
              width="100px"
              src={ recipe[1].strDrinkThumb || recipe[1].strMealThumb }
              alt={ `img ${recipe[1].strDrink || recipe[1].strMeal}` }
            />
            <div data-testid={ `${index}-recomendation-title` }>
              { recipe[1].strDrink || recipe[1].strMeal }
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

Recommended.propTypes = {
  recommendedRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchType: PropTypes.string.isRequired,
};

export default Recommended;
