import styles from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import useModal from '../../hooks/useModal.js';
import ingredientPropTypes from '../../prop-types/ingredient.types.jsx';

const Ingredient = ({ ingredient }) => {

    const { isModalOpen, openModal, closeModal } = useModal(false);
    
    return (
        <>
        <div className={styles.item} onClick = { openModal }>
            {ingredient._id === 0 && <Counter count={1} size="default" /> }
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