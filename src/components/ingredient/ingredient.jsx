import styles from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import useModal from '../../hooks/useModal.js';
import ingredientPropTypes from '../../prop-types/ingredient.types.jsx';
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';
import { getBurgerBun, getBurgerIngredients } from '../../services/selectors';

const Ingredient = ({ ingredient }) => {

    const { isModalOpen, openModal, closeModal } = useModal(false);

    const bun = useSelector(getBurgerBun);
    const ingredients = useSelector(getBurgerIngredients);
    const countBuns = (bun && bun._id === ingredient._id) ? 2 : 0;
    const countIngredients = ingredients.filter(item => item._id === ingredient._id).length + countBuns;

    const [ , dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient
    });    
    
    return (
        <>
        <div className={styles.item} onClick = { openModal } ref={ dragRef }>
            {countIngredients > 0 && <Counter count={countIngredients} size="small" /> }
            <img src={ingredient.image_large} alt={ingredient.name} />
            <div className={styles.price}>
                <span>{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <div className='mt-2 mb-6'>{ingredient.name}</div>
        </div>        
        {isModalOpen && ( 
            <Modal title="Детали ингредиента"  onClose = { closeModal }>
                <IngredientDetails ingredient = { ingredient } />
            </Modal>
        )}
        </>
    )
}

Ingredient.propTypes = {
    ingredient: ingredientPropTypes.isRequired
}

export default Ingredient;