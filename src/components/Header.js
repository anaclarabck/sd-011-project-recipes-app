import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import FiltersBar from './FiltersBar';
import { CardListContext } from '../context/CardListContext';

export default function Header(props) {
  const { isVisibleSearchBar, setVisibleSearchBar } = useContext(CardListContext);
  const history = useHistory();
  const { title, searchBar, fetchType, filterBar } = props;

  const buttonSearch = () => (
    <div
      role="button"
      onKeyPress={ () => setVisibleSearchBar(!isVisibleSearchBar) }
      onClick={ () => setVisibleSearchBar(!isVisibleSearchBar) }
      tabIndex="0"
    >
      <img
        data-testid="search-top-btn"
        alt="search button"
        src={ searchIcon }
      />
    </div>
  );

  return (
    <section className="container-header-filters">
      <header className="container-header">
        <div
          style={ { width: '30px' } }
          role="button"
          onKeyPress={ () => history.push('/perfil') }
          onClick={ () => history.push('/perfil') }
          tabIndex="0"
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile icon"
          />
        </div>
        <h3
          data-testid="page-title"
          style={ { margin: 'auto' } }
        >
          { title }
        </h3>
        <div style={ { width: '30px' } }>
          { searchBar && buttonSearch() }
        </div>
      </header>
      <section>
        { isVisibleSearchBar && <SearchBar fetchType={ fetchType } /> }
        { filterBar && !isVisibleSearchBar && <FiltersBar fetchType={ fetchType } /> }
      </section>
    </section>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  searchBar: PropTypes.bool,
}.isRequired;
