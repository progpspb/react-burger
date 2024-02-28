import { useState } from 'react';
import styles from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import ingredientPropTypes from '../../prop-types/ingredient.types.jsx';

const Ingredient = ({ ingredient }) => {

    const [showModal, setShowModal] = useState(false);

    function getModal() {
        setShowModal(!showModal);
    }

    return (
        <>
        <div className={styles.item} onClick = { getModal }>
            {ingredient._id === 0 && <Counter count={1} size="default" /> }
            <img src={ingredient.image_large} alt={ingredient.name} />
            <div className={styles.price}>
                <span>{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <div className='mt-2 mb-6'>{ingredient.name}</div>
        </div>        
        {showModal && ( 
            <Modal title="Детали ингредиента"  onClose = { getModal }>
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