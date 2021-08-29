import React, { useContext } from 'react';
import Header from '../../components/Header';
import { CardListContext } from '../../context/CardListContext';
import Footer from '../../components/Footer';
import CardsList from '../../components/CardsList';

export default function Drinks() {
  const { ingred } = useContext(CardListContext);
  return (
    <main>
      <Header title="Explorar Bebidas" searchBar filterBar fetchType="thecocktaildb" />
      <CardsList fetchType="thecocktaildb" ingredient={ ingred } />
      <Footer />
    </main>
  );
}
