import { useContext, useMemo, useReducer, useEffect, useState } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import useModal from '../../hooks/useModal.js';
import OrderDetails from '../order-details/order-details';
import { IngredientsContext } from '../../services/ingredients-context';
import { createOrder } from '../../utils/api';

function setTotalPrice(state, action) {
    switch (action.type) {
      case 'calculate':
        return (
          action.payload.bun.price * 2 + action.payload.items.reduce((sum, item) => (sum += item.price), 0)
        );
      default:
        throw new Error('Unknown action type in reducer setTotalPrice!');
    }
}

const BurgerConstructor = () => {

    const ingredients = useContext(IngredientsContext);
    const [ totalPrice, totalPriceDispatcher] = useReducer(setTotalPrice, 0);
    const [ orderDetails, setOrderDetails] = useState(null);
    const { isModalOpen, openModal, closeModal } = useModal(false);

    const burger = useMemo(() => {

        let bun = ingredients.filter((ingredient) => ingredient.type === 'bun')[0];
        let items = ingredients.filter((ingredient) => ingredient.type !== 'bun');
        
        // случайное количество ингредиентов в заказе
        const selectRandomItems = (items) => {
            let randomItems = [];
            let randomItem = {};
            let count = Math.floor(Math.random() * 10);
            for (let i = 1; i <= count; i++) {
                randomItem = items[Math.floor(Math.random() * items.length)];
                if(randomItems.includes(randomItem) === false) randomItems[i] = randomItem;
            }
            return randomItems;
        }

        return {
          bun: bun,
          items: selectRandomItems(items, 2),
        }

    }, [ingredients]);

    useEffect(() => {
        totalPriceDispatcher({ type: 'calculate', payload: burger });
    }, [burger]);

    const onCreateOrder = (burger) => {

        const ids = [
            burger.bun._id,
            ...burger.items.map((item) => item._id),
            burger.bun._id,
        ];

        const sendOrder = async ( data ) => {
            try {
                const result = await createOrder( data );
                if(result.success) {
                    setOrderDetails(result.order);
                    openModal();
                } else {
                    console.error('Произошла ошибка при создании заказа');
                }
            } catch (error) {
                console.error(error)
            }  
        }

        sendOrder(ids);
    };    
    
    return (

        <section>

            <div className={styles.order_items + ' mt-25 mb-4 pl-4'}>
                <div className = {styles.order_item + ' ml-8 mr-2'}>
                    <ConstructorElement 
                        text = {burger.bun.name + ' (верх)'}
                        price = {burger.bun.price} 
                        thumbnail = {burger.bun.image} 
                        isLocked = {true}
                        type = "top"
                    />
                </div>
            </div>

            <div className={styles.order_items_scroll + ' pl-4'}>
                {burger.items.map(item => {
                    return (                        
                        <div key = {item._id} className = {styles.order_item + ' mr-2'}>
                            <DragIcon type="primary" />
                            <ConstructorElement 
                                text = {item.name} 
                                price = {item.price} 
                                thumbnail = {item.image}   
                            />
                        </div>
                    )
                })}
            </div>

            <div className={styles.order_items + ' mt-4 pl-4'}>
                <div className = {styles.order_item + ' ml-8 mr-2'}>
                    <ConstructorElement 
                        text = {burger.bun.name + ' (низ)'}
                        price = {burger.bun.price} 
                        thumbnail = {burger.bun.image} 
                        isLocked = {true}
                        type = "bottom"
                    />
                </div>
            </div>            

            <div className={styles.order_footer + ' mt-10 mr-4'}>
                <span className={styles.order_total + ' text text_type_digits-medium mr-10'}>
                    {totalPrice}
                    <CurrencyIcon type="primary" className="text text_type_digits-medium"/>
                </span>
                <Button htmlType="button" type="primary" size="large" onClick={() => onCreateOrder(burger)}>Оформить заказ</Button>
            </div>

            {isModalOpen && (
                <Modal onClose = { closeModal }>
                    <OrderDetails order = {orderDetails} />
                </Modal>
            )}

        </section>

    );    
}

export default BurgerConstructor;