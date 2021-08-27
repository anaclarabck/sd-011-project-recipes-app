import React from 'react';
import PropTypes from 'prop-types';
import DetailCard from '../../components/DetailCard';

export default function MealDetail({ location }) {
  const { state: { id, fetchType } } = location;
  return (
    <div>
      <DetailCard id={ id } fetchType={ fetchType } />
    </div>
  );
}

MealDetail.propTypes = {
  location: PropTypes.string,
}.isRequired;
