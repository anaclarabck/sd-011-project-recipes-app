import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../App.css';

class DetalhesComidas extends Component {
  constructor() {
    super();
    this.state = {
      food: {},
      recomendations: [],
    };

    this.fetchIdMeal = this.fetchIdMeal.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;
    this.fetchIdMeal(pathname.split('/')[2]);
    this.recomendationsFetch();
  }

  fetchIdMeal(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((data) => data.json())
      .then((response) => this.setState({
        food: response,
      }));
  }

  recomendationsFetch() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((data) => data.json())
      .then((response) => this.setState({
        recomendations: response,
      }));
  }

  render() {
    const { food, recomendations } = this.state;
    const { meals } = food;
    const { drinks } = recomendations;
    const magicNumber = 6;
    if (!meals) {
      return <p>Carregando</p>;
    }
    const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = meals[0];
    const ingredientes = Object.keys(meals[0]);
    const filtrados = ingredientes.filter((value) => value.includes('strIngredient'));
    const values = filtrados.map((value) => meals[0][value]);
    const onlyIngredientes = values.filter((value) => value);
    const filtradosMeasure = ingredientes.filter((value) => value.includes('strMeasure'));
    const valuesMeasure = filtradosMeasure.map((value) => meals[0][value]);
    const onlyMeasures = valuesMeasure.filter((value) => value);
    return (
      <div>
        Detalhes de comidas
        <div>
          <img
            data-testid="recipe-photo"
            src={ strMealThumb }
            alt={ strMeal }
            style={ { width: '100px' } }
          />
        </div>
        <div>
          <h3 data-testid="recipe-title">{ strMeal }</h3>
          <button
            type="button"
            data-testid="share-btn"
          >
            <img src={ shareIcon } alt="share" />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            <img src={ whiteHeartIcon } alt="favorite" />
          </button>
          <p data-testid="recipe-category">{ strCategory }</p>
          <p>Ingredientes:</p>
          { onlyIngredientes.map((value, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${value} - ${onlyMeasures[index]}`}
            </p>)) }
          <p data-testid="instructions">{ strInstructions }</p>
          <iframe
            src={ strYoutube }
            height="200"
            width="300"
            title={ strMeal }
            data-testid="video"
          />
          <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
        </div>
        <div className="div-scroll">
          {
            drinks
            && drinks.map((value, index) => (
              index < magicNumber
            && (
              <div
                data-testid={ `${index}-recomendation-card` }
                className="recomendation-card"
              >
                <img
                  className="img-card"
                  src={ value.strDrinkThumb }
                  alt={ value.strDrink }
                />
                <p data-testid={ `${index}-recomendation-title` }>{ value.strDrink }</p>
                <p>{ value.strAlcoholic }</p>
              </div>)
            ))
          }
        </div>
      </div>
    );
  }
}

export default DetalhesComidas;

DetalhesComidas.propTypes = {
  history: PropTypes.oneOfType.isRequired,
};
