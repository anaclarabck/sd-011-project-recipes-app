import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import fetchByFilter from '../services/data';

export const CardListContext = createContext();

export function CardListProvider({ children }) {
  const [isVisibleSearchBar, setVisibleSearchBar] = useState(false);
  const [cardsList, setCardsList] = useState(); // o que será renderizado no CardList
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState({ searchType: 'filter.php?i=', searchInput: '' });
  const [filter, setFilter] = useState('');

  const handleClickSearch = async (fetchType) => {
    const { searchType: type, searchInput: input } = search;
    const urlToFetch = `https://www.${fetchType}.com/api/json/v1/1/${type}${input}`;
    if (type === 'search.php?f=' && input.length > 1) {
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const dataFromApi = await fetchByFilter(urlToFetch);
    setCardsList(Object.values(dataFromApi)[0]);
  };

  const value = {
    isVisibleSearchBar,
    setVisibleSearchBar,
    search,
    setSearch,
    cardsList,
    setCardsList,
    categories,
    setCategories,
    filter,
    setFilter,
    handleClickSearch,
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
