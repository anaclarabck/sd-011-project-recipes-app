import React from 'react';
import PropTypes from 'prop-types';
import DetailCard from '../../components/DetailCard';

export default function DrinkRecipes({ location }) {
  const { state: { id, fetchType } } = location;
  return (
    <div>
      <DetailCard id={ id } fetchType={ fetchType } />
    </div>
  );
}

DrinkRecipes.propTypes = {
  location: PropTypes.string,
}.isRequired;
