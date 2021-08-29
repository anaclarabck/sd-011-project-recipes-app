import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { CardListContext } from '../context/CardListContext';
import fetchByFilter from '../services/data';

export default function CardsListByIngredient(props) {
  const [ingredientsList, setIngredientsList] = useState([]);
  const history = useHistory();
  const { fetchType } = props;
  const { setVisibleSearchBar, setSearch, setCardsList } = useContext(CardListContext);

  useEffect(() => {
    const getRecipes = async () => {
      const urlToFetch = `https://www.${fetchType}.com/api/json/v1/1/list.php?i=list`;
      const ingredientsFromApi = await fetchByFilter(urlToFetch);
      const ingredient = fetchType === 'themealdb' ? 'strIngredient' : 'strIngredient1';
      const ingredientsListJSON = Object.values(ingredientsFromApi)[0].map((item) => (
        { name: item[ingredient],
          image: `https://www.${fetchType}.com/images/ingredients/${item[ingredient]}-Small.png` }));
      const MAX = 12;
      setIngredientsList(ingredientsListJSON.slice(0, MAX));
    };
    getRecipes();
  }, []);

  const handleClick = async (value) => {
    const urlToFetch = `https://www.${fetchType}.com/api/json/v1/1/filter.php?i=${value}`;
    const dataFromApi = await fetchByFilter(urlToFetch);
    setSearch({ searchType: 'filter.php?i=', searchInput: value });
    setCardsList(Object.values(dataFromApi)[0]);
    setVisibleSearchBar(true);
    const tipo = fetchType === 'themealdb' ? 'comidas' : 'bebidas';
    history.push(`/${tipo}`);
  };

  return (
    <div style={ { position: 'relative', top: '75px' } }>
      { ingredientsList.map((ingredient, index) => (
        <Card
          style={ { margin: '10px auto', width: '304px', boxShadow: '0 0 5px' } }
          role="button"
          data-testid={ `${index}-ingredient-card` }
          key={ index }
          onClick={ () => handleClick(ingredient.name) }
          onKeyPress={ () => handleClick(ingredient.name) }
          tabIndex="0"
        >
          <Card.Body
            style={
              { display: 'flex', alignItems: 'center', justifyContent: 'space-around' }
            }
          >
            <img
              style={ { width: '100px' } }
              src={ ingredient.image }
              alt={ `figure ${ingredient.name}` }
              data-testid={ `${index}-card-img` }
            />
            <p
              style={ { fontSize: '20px', fontWeight: 'bold', textAlign: 'right' } }
              data-testid={ `${index}-card-name` }
            >
              { ingredient.name }
            </p>
          </Card.Body>
        </Card>
      )) }
    </div>
  );
}

CardsListByIngredient.propTypes = {
  fetchType: PropTypes.string,
}.isRequired;
