import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';

export default function Cards(props) {
  const { recipe, index, type } = props;
  const history = useHistory();
  const tipo = type === 'themealdb' ? 'comidas' : 'bebidas';

  return (
    <Card
      style={ { margin: '20px auto', width: '304px', boxShadow: '0 0 5px' } }
      data-testid={ `${index}-recipe-card` }
      onClick={ () => history.push({
        pathname: `/${tipo}/${recipe.idDrink || recipe.idMeal}`,
        state: { id: recipe.idDrink || recipe.idMeal, fetchType: type } }) }
    >
      <Card.Img
        variant="top"
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
        data-testid={ `${index}-card-img` }
        objectFit="cover"
      />
      <Card.Body
        style={ { textAlign: 'center', fontSize: '20px', fontWeight: 'bold' } }
        data-testid={ `${index}-card-name` }
      >
        { recipe.strMeal || recipe.strDrink }
      </Card.Body>
    </Card>
  );
}

Cards.propTypes = {
  key: PropTypes.string,
  recipe: PropTypes.string,
}.isRequired;
