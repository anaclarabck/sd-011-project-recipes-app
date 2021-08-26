import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const CardListContext = createContext();

export function CardListProvider({ children }) {
  const [cardsList, setCardsList] = useState(); // o que será renderizado no CardList
  const [search, setSearch] = useState({ radio: '', input: '' });
  const [input, setInput] = useState('');
  const [radio, setRadio] = useState('');
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('');
  // Jorge
  const [ingred, setIngred] = useState('');

  const value = {
    search,
    setSearch,
    input,
    setInput,
    radio,
    setRadio,
    cardsList,
    setCardsList,
    categories,
    setCategories,
    filter,
    setFilter,
    ingred,
    setIngred,
  };
  return (
    <CardListContext.Provider value={ value }>
      { children }
    </CardListContext.Provider>
  );
}

CardListProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
