import {useState} from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import PropTypes from 'prop-types';
import ingredientPropTypes from '../../prop-types/ingredient.types.jsx';

const BurgerConstructor = ({ ingredients }) => {

    const [showModal, setModal] = useState(false);   
    
    const onModalClosed = () => {setModal(false);}
  
    return (
        <>

        <section>            
            <div className={styles.order_items + ' pl-4'}>

                {ingredients.map((ingredient,index) => {
                    return (                        
                        <div key = {index} className = {styles.order_item + ' mr-2'}>
                            {(index > 0 && index < ingredients.length - 1) ? <DragIcon type="primary" /> : <span className='ml-6'></span>}
                            <ConstructorElement 
                                text = {ingredient.name} 
                                price = {ingredient.price} 
                                thumbnail = {ingredient.image} 
                                key = {index} 
                                type = {(index === 0) ? 'top' :(index === ingredients.length - 1) ? 'bottom' : ''}  
                            />
                        </div>
                    );
                })}

            </div>

            <div className={styles.order_footer + ' mt-10 mr-4'}>
                <span className={styles.order_total + ' text text_type_digits-medium mr-10'}>
                    {1500}
                    <CurrencyIcon type="primary" className="text text_type_digits-medium"/>
                </span>
                <Button htmlType="button" type="primary" size="large" onClick={() => setModal(true)}>Оформить заказ</Button>
            </div>

        </section>

        <Modal isOpen={showModal} setModalOpened={onModalClosed}>
            <OrderDetails 
                order = {{
                    number: '034536', 
                    id: 'идентификатор заказа', 
                    status: 'Ваш заказ начали готовить', 
                    message: 'Дождитесь готовности на орбитальной станции'
                }}
            />
        </Modal>

        </>
    );    
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired
}

export default BurgerConstructor;