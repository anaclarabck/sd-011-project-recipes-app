import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
// import rockGlass from './images/rockGlass.svg';
import RecipesMain from './pages/RecipesMain';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="meals">
      {/* <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object> */}
      <Switch>
        <Route exact path="/" />
        <Route exact path="/comidas">
          <RecipesMain type="comida" />
        </Route>
        <Route exact path="/bebidas">
          <RecipesMain type="bebida" />
        </Route>
        <Route exact path="/comidas/:recipeId" />
        <Route exact path="/bebidas/:recipeId" />
        <Route exact path="/comidas/:recipeId/in-progress" />
        <Route exact path="/bebidas/:recipeId/in-progress" />
        <Route exact path="/explorar" />
        <Route exact path="/explorar/comidas" />
        <Route exact path="/explorar/bebidas" />
        <Route exact path="/explorar/comidas/ingredientes" />
        <Route exact path="/explorar/bebidas/ingredientes" />
        <Route exact path="/explorar/comidas/area" />
        <Route exact path="/perfil" />
        <Route exact path="/receitas-feitas" />
        <Route exact path="/receitas-favoritas" />
      </Switch>
    </div>
  );
}

export default App;
