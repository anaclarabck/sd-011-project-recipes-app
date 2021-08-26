import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CardsListByIngredient from '../../components/CardsListByIngredient';

export default function DrinkExplorerByIngredients() {
  return (
    <>
      <Header title="Explorar Ingredientes" />
      <CardsListByIngredient />
      <Footer />
    </>
  );
}
