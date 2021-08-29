import React, { useContext } from 'react';
import Header from '../../components/Header';
import { CardListContext } from '../../context/CardListContext';
import Footer from '../../components/Footer';
import CardsList from '../../components/CardsList';

export default function Meals() {
  const { ingred } = useContext(CardListContext);
  return (
    <main>
      <Header title="Explorar Comidas" searchBar filterBar fetchType="themealdb" />
      <CardsList fetchType="themealdb" ingredient={ ingred } />
      <Footer />
    </main>
  );
}
