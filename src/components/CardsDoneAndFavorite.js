import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import ButtonShare from './ButtonShare';
import ButtonFavorite from './ButtonFavorite';

export default function CardsDoneAndFavorite(props) {
  const { index, recipe, typeCard } = props;
  const { type, name, image, doneDate, category, id } = recipe;
  const { tags, alcoholicOrNot, area } = recipe;
  const history = useHistory();
  const firstTags = tags.filter((_tag, ind) => ind < 2);
  const href = window.location.origin;

  const onClickTitleOrImage = () => {
    history.push({
      pathname: `/${type}s/${id}`,
      state: { id, fetchType: type === 'comida' ? 'themealdb' : 'thecocktaildb' } });
  };

  const doneDateTag = (
    <p style={ { fontSize: '13px' } }>
      Feita em:
      { ' ' }
      <span data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</span>
    </p>
  );

  const mealsTags = (
    <div>
      { tags && firstTags.map((tag) => (
        <span
          className="cards-favorite-done-tags"
          key={ tag }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          { tag }
        </span>
      ))}
    </div>
  );

  return (
    <div className="card-favor-and-done">
      <Card.Img
        variant="top"
        data-testid={ `${index}-horizontal-image` }
        src={ image }
        alt="Foto da receita"
        role="button"
        tabIndex="-1"
        onClick={ onClickTitleOrImage }
        onKeyPress={ onClickTitleOrImage }
      />
      <Card.Body style={ { width: '260px' } }>
        <div className="card-favorite-done-title">
          <Card.Title
            style={ { fontWeight: 'bold', margin: '10px 0' } }
            data-testid={ `${index}-horizontal-name` }
            role="button"
            tabIndex="0"
            onClick={ onClickTitleOrImage }
            onKeyPress={ onClickTitleOrImage }
          >
            { name }
          </Card.Title>
          <div className="card-done-favorite-buttons">
            <ButtonShare
              testid={ `${index}-horizontal-share-btn` }
              path={ `${href}/${type}s/${id}` }
            />
            { typeCard === 'favoriteRecipes'
            && <ButtonFavorite
              objData={ recipe }
              testid={ `${index}-horizontal-favorite-btn` }
            /> }
          </div>
        </div>
        <Card.Text>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            { area ? `${area} - ${category}` : alcoholicOrNot }
          </p>
          { typeCard === 'doneRecipes' && doneDateTag }
        </Card.Text>
        { typeCard === 'doneRecipes' && mealsTags }
      </Card.Body>
    </div>
  );
}

CardsDoneAndFavorite.propTypes = {
  key: PropTypes.number,
}.isRequired;
