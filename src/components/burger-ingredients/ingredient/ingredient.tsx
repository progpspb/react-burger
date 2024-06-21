import styles from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';
import { getBurgerBun, getBurgerIngredients } from '../../../services/selectors';
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';
import { IngredientType } from '../../../types/types';

interface IIngredient {
    key: string;
    ingredient: IngredientType;
}

const Ingredient = ({key, ingredient }: IIngredient) => {

    const location = useLocation();

    const bun = useSelector(getBurgerBun);
    const ingredients = useSelector(getBurgerIngredients);
    const countBuns = (bun && bun._id === key) ? 2 : 0;
    const countIngredients = ingredients.filter((item: IngredientType) => item._id === key).length + countBuns;

    const [ , dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient
    });      
    
    return (
        <Link 
            key={key} 
            to={`/ingredients/${key}`} 
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