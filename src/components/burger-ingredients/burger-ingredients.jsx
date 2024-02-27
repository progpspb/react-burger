import {useState, useMemo} from 'react';
import styles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import ingredientPropTypes from '../../prop-types/ingredient.types.jsx';

const BurgerIngredients = ({ ingredients }) => {

    const [current, setCurrent] = useState('buns');
    const [showModal, setModal] = useState({ ingredient: null, isOpen: false });

    const bun = useMemo(() => ingredients.filter(item => item.type === 'bun'), [ingredients]);
    const sauce = useMemo(() => ingredients.filter(item => item.type === 'sauce'), [ingredients]); 
    const main = useMemo(() => ingredients.filter(item => item.type === 'main'), [ingredients]);

    const ingredientsCollection = [
        {name:'Булки',type:'bun','items':bun}, 
        {name:'Соусы',type:'sauce','items':sauce}, 
        {name:'Начинки',type:'main','items':main}
    ]; 

    const showModalHandler = (ingredient) => {
        setModal({
            ingredient,
            isOpen: true,
        });
    }

    const onModalClosed = () => {
        setModal({
            ingredient: null,
            isOpen: false,
        });
    }

    return (
        <>

        <section>

            <h1 className = 'text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>

            <div className = {styles.tabs}>
            {ingredientsCollection.map((ingredient, idx) => {
                return (
                    <>
                    <Tab value={ingredient.type} active={current === ingredient.type} onClick={setCurrent}>{ingredient.name}</Tab>
                    </>
                )
            })}
            </div>

            <div className={styles.tab_scroll + ' pb-10'}>
                {ingredientsCollection.map((ingredient, idx) => {
                    return (
                        <>
                        <h2 id={ingredient.type} className='text text_type_main-large mt-10 mb-5'>{ingredient.name}</h2>
                        <div className={styles.items}>
                        {ingredient.items.map((item, index) => {
                            return (
                                <div className={styles.item} key={index} onClick={() => showModalHandler(item)}>
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
                        </>
                    )
                })}
            </div>
           
        </section>

        <Modal title="Детали ингредиента" isOpen={showModal.isOpen} setModalOpened={onModalClosed}>
                <IngredientDetails ingredient={showModal.ingredient} />
        </Modal>

        </>
   );      
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired
}

export default BurgerIngredients;