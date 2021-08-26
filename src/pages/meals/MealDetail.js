import React from 'react';
import PropTypes from 'prop-types';
import DetailCard from '../../components/DetailCard';

export default function MealDetail({ location }) {
  const { state } = location;
  return (
    <div>
      <DetailCard recipe={ state } />
    </div>
  );
}

MealDetail.propTypes = {
  location: PropTypes.string,
}.isRequired;
