import React from 'react';
import PropTypes from 'prop-types';
import DetailCard from '../../components/DetailCard';
import MealDetailCard from '../../components/MealDetailCard';

export default function FoodRecipes({ location }) {
  const { state } = location;
  return (
    <div>
      <DetailCard recipe={ state } />
      <MealDetailCard />
    </div>
  );
}

FoodRecipes.propTypes = {
  location: PropTypes.string,
}.isRequired;
