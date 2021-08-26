import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { CardListContext } from '../context/CardListContext';

export default function SearchBar(props) {
  const {
    search,
    setSearch,
    cardsList,
    handleClickSearch,
  } = useContext(CardListContext);

  const { fetchType } = props;

  useEffect(() => {
    if (!cardsList) {
      // eslint-disable-next-line no-alert
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [cardsList]);

  const handleSearch = ({ target: { name, value } }) => {
    setSearch({ ...search, [name]: value });
  };

  return (
    <nav
      style={
        { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }
      }
    >
      <Form>
        <Form.Label htmlFor="search-input" style={ { margin: '5px' } }>
          <Form.Control
            name="searchInput"
            id="search-input"
            type="text"
            data-testid="search-input"
            value={ search.searchInput }
            onChange={ handleSearch }
          />
        </Form.Label>
        <Button
          style={ { background: '#4b2c0d' } }
          variant="dark"
          data-testid="exec-search-btn"
          type="button"
          onClick={ () => handleClickSearch(fetchType) }
        >
          Buscar
        </Button>
      </Form>
      <form
        style={
          { display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }
        }
      >
        <label htmlFor="ingredient" style={ { margin: '5px' } }>
          <input
            style={ { margin: '5px' } }
            name="searchType"
            id="ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
            value="filter.php?i="
            onChange={ handleSearch }
          />
          Ingrediente
        </label>
        <label htmlFor="name" style={ { margin: '5px' } }>
          <input
            style={ { margin: '5px' } }
            name="searchType"
            id="name"
            type="radio"
            data-testid="name-search-radio"
            value="search.php?s="
            onChange={ handleSearch }
          />
          Nome
        </label>
        <label htmlFor="first-letter" style={ { margin: '5px' } }>
          <input
            style={ { margin: '5px' } }
            name="searchType"
            id="first-letter"
            type="radio"
            data-testid="first-letter-search-radio"
            value="search.php?f="
            onChange={ handleSearch }
          />
          Primeira letra
        </label>
      </form>
    </nav>
  );
}

SearchBar.propTypes = {
  fetchType: PropTypes.string,
}.isRequired;
