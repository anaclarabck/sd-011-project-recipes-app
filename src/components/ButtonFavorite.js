import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { createRecipeData, updateStorage } from '../services/functions';

function ButtonFavorite({ objData, testid }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (favorite) {
      const recipeToStorage = createRecipeData(objData, 'favoriteRecipes');
      updateStorage('favoriteRecipes', recipeToStorage, 'add');
    } else {
      updateStorage('favoriteRecipes', objData, 'remove');
    }
  }, [favorite]);

  return (
    <div
      role="button"
      onKeyPress={ () => setFavorite(!favorite) }
      onClick={ () => setFavorite(!favorite) }
      tabIndex="0"
    >
      <img
        data-testid={ testid }
        src={ favorite ? blackHeartIcon : whiteHeartIcon }
        alt="favorite btn"
      />
    </div>
  );
}

ButtonFavorite.propTypes = {
  objData: PropTypes.shape(
    PropTypes.string,
  ).isRequired,
};

export default ButtonFavorite;
