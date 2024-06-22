import styles from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { useSelector } from '../../../hooks';
import { getBurgerBun, getBurgerIngredients } from '../../../services/selectors';
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';
import { IngredientType } from '../../../types/types';

const Ingredient = ({ingredient} : {ingredient: IngredientType}) => {

    const location = useLocation();

    const id = ingredient._id;

    const bun = useSelector(getBurgerBun);
    const ingredients = useSelector(getBurgerIngredients);
    const countBuns = (bun && bun._id === id) ? 2 : 0;
    const countIngredients = ingredients.filter((item: IngredientType) => item._id === id).length + countBuns;

    const [ , dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient
    });      
    
    return (
        <Link 
            key={id} 
            to={`/ingredients/${id}`} 
            state={{ background: location }} 
            className={styles.link}
            ref={ dragRef }
        >
            <div className={styles.item}>
                {countIngredients > 0 && <Counter count={countIngredients} size="small" /> }
                <img src={ingredient.image_large} alt={ingredient.name} />
                <div className={styles.price}>
                    <span>{ingredient.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <div className='mt-2 mb-6'>{ingredient.name}</div>
            </div>
        </Link>
    )
}

export default Ingredient;