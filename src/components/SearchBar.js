import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { CardListContext } from '../context/CardListContext';
import fetchByFilter from '../services/data';

export default function SearchBar(props) {
  const {
    input,
    setInput,
    radio,
    setRadio,
    cardsList,
    setCardsList,
  } = useContext(CardListContext);

  const { fetchType } = props;

  useEffect(() => {
    if (!cardsList) {
      // eslint-disable-next-line no-alert
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [cardsList]);

  const handleClick = async () => {
    const urlToFetch = `https://www.${fetchType}.com/api/json/v1/1/${radio}${input}`;
    if (radio === 'search.php?f=' && input.length > 1) {
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const dataFromApi = await fetchByFilter(urlToFetch);
    setCardsList(Object.values(dataFromApi)[0]);
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
            id="search-input"
            type="text"
            data-testid="search-input"
            value={ input }
            onChange={ (e) => setInput(e.target.value) }
          />
        </Form.Label>
        <Button
          style={ { background: '#4b2c0d' } }
          variant="dark"
          data-testid="exec-search-btn"
          type="button"
          onClick={ handleClick }
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
            name="search-type"
            id="ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
            value="filter.php?i="
            onChange={ (e) => setRadio(e.target.value) }
          />
          Ingrediente
        </label>
        <label htmlFor="name" style={ { margin: '5px' } }>
          <input
            style={ { margin: '5px' } }
            name="search-type"
            id="name"
            type="radio"
            data-testid="name-search-radio"
            value="search.php?s="
            onChange={ (e) => setRadio(e.target.value) }
          />
          Nome
        </label>
        <label htmlFor="first-letter" style={ { margin: '5px' } }>
          <input
            style={ { margin: '5px' } }
            name="search-type"
            id="first-letter"
            type="radio"
            data-testid="first-letter-search-radio"
            value="search.php?f="
            onChange={ (e) => setRadio(e.target.value) }
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
