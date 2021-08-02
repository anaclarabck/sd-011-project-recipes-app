import React, { useContext } from 'react';
import { RecipesContext } from '../context/RecipesContext';
import RecipeCard from './RecipeCard';

export default function FiltersBar() {
  const {
    foodsFiltered, foodCategories, setFoodsFilter, foodsFilter,
  } = useContext(RecipesContext);

  const onClickFoodFilter = (clickedCategory) => {
    if (clickedCategory === foodsFilter) {
      setFoodsFilter('');
    } else {
      setFoodsFilter(clickedCategory);
    }
  };

  return (
    <>
      <section>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => onClickFoodFilter('') }
        >
          All
        </button>
        { foodCategories.length > 0 && foodCategories.map((cat) => (
          <button
            type="button"
            key={ cat.strCategory }
            data-testid={ `${cat.strCategory}-category-filter` }
            onClick={ () => onClickFoodFilter(cat.strCategory) }
          >
            {cat.strCategory}
          </button>
        ))}
      </section>
      <section>
        { foodsFiltered.length > 0 && foodsFiltered.map((recipe, index) => (
          <RecipeCard recipe={ recipe } index={ index } type="Meal" key={ index } />
        ))}
      </section>
    </>
  );
}
