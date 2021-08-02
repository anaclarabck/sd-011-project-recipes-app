import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Drink from './pages/Drink';
import Foods from './pages/Foods';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodsIngredientes from './pages/ExploreFoodsIngredientes';
import ExploreDrinksIngredientes from './pages/ExploreDrinksIngredientes';
import ExploreFoodsArea from './pages/ExploreFoodsArea';
import Perfil from './pages/Perfil';
import MakedRevenues from './pages/MakedRevenues';
import FavoritedRevenues from './pages/FavoritedRevenues';
import 'bootstrap/dist/css/bootstrap.min.css';
import DetailsDrinks from './pages/DetailsDrinks';
import DetailsFoods from './pages/DetailsFoods';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route
            exact
            path="/comidas/:id"
            render={ (props) => <DetailsFoods { ...props } /> }
          />
          <Route
            exact
            path="/bebidas/:id"
            render={ (props) => <DetailsDrinks { ...props } /> }
          />
          <Route exact path="/comidas" component={ Foods } />
          <Route exact path="/bebidas" component={ Drink } />
          <Route exact path="/explorar" component={ Explore } />
          <Route exact path="/explorar/comidas" component={ ExploreFoods } />
          <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ ExploreFoodsIngredientes }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ ExploreDrinksIngredientes }
          />
          <Route exact path="/explorar/comidas/area" component={ ExploreFoodsArea } />
          <Route exact path="/perfil" component={ Perfil } />
          <Route exact path="/receitas-feitas" component={ MakedRevenues } />
          <Route exact path="/receitas-favoritadas" component={ FavoritedRevenues } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
