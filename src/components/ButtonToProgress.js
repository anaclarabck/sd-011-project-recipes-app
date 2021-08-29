import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function ButtonToProgress(props) {
  const { data } = props;
  const id = data.idMeal || data.idDrink;
  const type = data.idMeal ? 'comidas' : 'bebidas';
  const history = useHistory();
  const [progress, setProgress] = useState(false);
  const [canStart, setCanStart] = useState(true);

  useEffect(() => {
    const inProgress = localStorage.getItem('inProgressRecipes');
    const doneRecipes = localStorage.getItem('doneRecipes');
    if (!doneRecipes) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    if (doneRecipes.includes(id)) {
      setCanStart(false);
    }
    if (!inProgress) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
    if (inProgress.includes(id)) {
      setProgress(true);
    }
  }, []);

  const startButton = () => (
    <div className="button-to-progress">
      <Button
        className="button-style"
        variant="dark"
        style={ { position: 'fixed', bottom: 0 } }
        data-testid="start-recipe-btn"
        type="button"
        onClick={ () => history.push({
          pathname: `/${type}/${id}/in-progress`,
          state: data }) }
      >
        { progress ? 'Continuar Receita' : 'Iniciar Receita' }
      </Button>
    </div>
  );

  return canStart && startButton();
}

ButtonToProgress.propTypes = {
  mealDetail: PropTypes.shape({
    idMeal: PropTypes.string,
  }),
  drinkDetail: PropTypes.shape({
    idDrink: PropTypes.string,
  }),
}.isRequired;

export default ButtonToProgress;
