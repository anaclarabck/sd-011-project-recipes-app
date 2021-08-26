import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { CardListProvider } from '../context/CardListContext';
import '@testing-library/jest-dom/extend-expect';

const renderWithRouterAndContext = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <CardListProvider>
        <Router history={ history }>{ component }</Router>
      </CardListProvider>,
    ),
    history,
  });
};

export default renderWithRouterAndContext;
