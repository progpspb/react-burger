import { useState, useMemo, useContext } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../ingredient/ingredient';
import PropTypes from 'prop-types';
import ingredientPropTypes from '../../prop-types/ingredient.types.jsx';
import { IngredientsContext } from '../../services/ingredients-context';

const BurgerIngredients = () => {

    const ingredients = useContext(IngredientsContext);
    const [ current, setCurrent ] = useState('buns');

    const bun = useMemo(() => ingredients.filter(item => item.type === 'bun'), [ingredients]);
    const sauce = useMemo(() => ingredients.filter(item => item.type === 'sauce'), [ingredients]); 
    const main = useMemo(() => ingredients.filter(item => item.type === 'main'), [ingredients]);

    const ingredientsCollection = [
        {name:'Булки',type:'bun','items':bun}, 
        {name:'Соусы',type:'sauce','items':sauce}, 
        {name:'Начинки',type:'main','items':main}
    ];

    return (

        <section>

            <h1 className = 'text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>

            <div className = {styles.tabs}>
                <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
                <Tab value='sauce' active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
                <Tab value='main' active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
            </div>

            <div className={styles.tab_scroll + ' pb-10'}>
                {ingredientsCollection.map((ingredientType, idx) => {
                    return (
                        <div key = {idx}>
                            <h2 className='text text_type_main-large mt-10 mb-5'>{ingredientType.name}</h2>
                            <div className={styles.items}>
                            {ingredientType.items.map(item => {
                                return (
                                    <Ingredient
                                        key = {item._id}
                                        ingredient = {item}
                                    />
                                )
                            })}
                            </div>
                        </div>
                    )
                })}
            </div>
           
        </section>
   );      
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes)
}

export default BurgerIngredients;