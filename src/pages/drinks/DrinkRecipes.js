import React from 'react';
import PropTypes from 'prop-types';
import DetailCard from '../../components/DetailCard';

export default function DrinkRecipes({ location }) {
  const { state } = location;
  return (
    <div>
      <DetailCard recipe={ state } />
    </div>
  );
}

DrinkRecipes.propTypes = {
  location: PropTypes.string,
}.isRequired;
