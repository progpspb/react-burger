import {useState, useMemo} from 'react';
import styles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import useModal from '../../hooks/useModal.js';
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import ingredientPropTypes from '../../prop-types/ingredient.types.jsx';

const BurgerIngredients = ({ ingredients }) => {

    const [current, setCurrent] = useState('buns');
    const [modalIngredient, setModalIngredient] = useState({});

    const { isModalOpen, openModal, closeModal } = useModal(false);

    const bun = useMemo(() => ingredients.filter(item => item.type === 'bun'), [ingredients]);
    const sauce = useMemo(() => ingredients.filter(item => item.type === 'sauce'), [ingredients]); 
    const main = useMemo(() => ingredients.filter(item => item.type === 'main'), [ingredients]);

    const ingredientsCollection = [
        {name:'Булки',type:'bun','items':bun}, 
        {name:'Соусы',type:'sauce','items':sauce}, 
        {name:'Начинки',type:'main','items':main}
    ];

    const showModalHandler = (ingredient) => {
        setModalIngredient(ingredient);
        openModal();
    }

    return (

        <section>

            <h1 className = 'text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>

            <div className = {styles.tabs}>
                <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
                <Tab value='sauce' active={current === 'sauce'} onClick={setCurrent}>Булки</Tab>
                <Tab value='main' active={current === 'main'} onClick={setCurrent}>Булки</Tab>
            </div>

            <div className={styles.tab_scroll + ' pb-10'}>
                {ingredientsCollection.map((ingredientType, idx) => {
                    return (
                        <div key = {idx}>
                            <h2 className='text text_type_main-large mt-10 mb-5'>{ingredientType.name}</h2>
                            <div className={styles.items}>
                            {ingredientType.items.map((item, index) => {
                                return (
                                    <div key = {item._id} className={styles.item} onClick={() => showModalHandler(item)}>
                                        {index === 0 && <Counter count={1} size="default" /> }
                                        <img src={item.image_large} alt={item.name} />
                                        <div className={styles.price}>
                                            <span>{item.price}</span>
                                            <CurrencyIcon type="primary" />
                                        </div>
                                        <div className='mt-2 mb-6'>{item.name}</div>
                                    </div>
                                )
                            })}
                            </div>
                        </div>
                    )
                })}
            </div>
            
            {isModalOpen && (
                <Modal title="Детали ингредиента"  onClose = { closeModal }>
                    <IngredientDetails ingredient={ modalIngredient } />
                </Modal>
            )}
           
        </section>
   );      
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes)
}

export default BurgerIngredients;