import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CardListContext } from '../context/CardListContext';
import Cards from './Cards';

export default function CardsList(props) {
  const { cardsList } = useContext(CardListContext);
  const { fetchType, styleHeight } = props;
  const MAX_CARDS = 12;

  if (cardsList && cardsList.length > 0) {
    return (
      <div
        style={ { marginTop: styleHeight ? '127px' : '175px', paddingBottom: '60px' } }
      >
        { cardsList.slice(0, MAX_CARDS).map((eachRecipe1, index1) => (<Cards
          recipe={ eachRecipe1 }
          type={ fetchType }
          index={ index1 }
          key={ index1 }
        />
        ))}
      </div>
    );
  }

  return (
    <div
      style={ {
        marginTop: styleHeight ? '127px' : '175px',
        textAlign: 'center',
      } }
    >
      Não há itens.
    </div>);
}

CardsList.propTypes = {
  fetchType: PropTypes.string,
}.isRequired;
