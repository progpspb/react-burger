import { useState } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import PropTypes from 'prop-types';
import ingredientPropTypes from '../../prop-types/ingredient.types.jsx';

const BurgerConstructor = ({ ingredients }) => {

    const [showModal, setModal] = useState(false);
    
    const onModalClosed = () => {
        setModal(false);
    }
  
    return (

        <section>

            <div className={styles.order_items + ' mt-25 mb-4 pl-4'}>
                <div className = {styles.order_item + ' mr-2'}>
                    <span className='ml-6'></span>
                    <ConstructorElement 
                        text = "Краторная булка N-200i (верх)"
                        price = {1255} 
                        thumbnail = "https://code.s3.yandex.net/react/code/bun-02.png" 
                        isLocked = {true}
                        type = "top"
                    />
                </div>
            </div>

            <div className={styles.order_items_scroll + ' pl-4'}>
                {ingredients.map(ingredient => {
                    if (ingredient.type !== 'bun') {
                        return (                        
                            <div key = {ingredient._id} className = {styles.order_item + ' mr-2'}>
                                <DragIcon type="primary" />
                                <ConstructorElement 
                                    text = {ingredient.name} 
                                    price = {ingredient.price} 
                                    thumbnail = {ingredient.image}   
                                />
                            </div>
                        )
                    } else {
                        return null;
                    }
                })}
            </div>

            <div className={styles.order_items + ' mt-4 pl-4'}>
                <div className = {styles.order_item + ' mr-2'}>
                    <span className='ml-6'></span>
                    <ConstructorElement 
                        text = "Краторная булка N-200i (низ)"
                        price = {1255} 
                        thumbnail = "https://code.s3.yandex.net/react/code/bun-02.png" 
                        isLocked = {true}
                        type = "bottom"
                    />
                </div>
            </div>            

            <div className={styles.order_footer + ' mt-10 mr-4'}>
                <span className={styles.order_total + ' text text_type_digits-medium mr-10'}>
                    {1500}
                    <CurrencyIcon type="primary" className="text text_type_digits-medium"/>
                </span>
                <Button htmlType="button" type="primary" size="large" onClick={() => setModal(true)}>Оформить заказ</Button>
            </div>

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

        </section>

    );    
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired
}

export default BurgerConstructor;