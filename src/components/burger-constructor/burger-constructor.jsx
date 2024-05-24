import { useState, useCallback } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import loaderImg from '../../images/loader.svg';
import Modal from '../modal/modal';
import useModal from '../../hooks/useModal.js';
import DraggableItem from './draggable-item.jsx';
import OrderDetails from '../order-details/order-details';
import { useDrop } from 'react-dnd';
import { createOrder } from '../../utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { getBurgerBun, getBurgerIngredients, setTotalPrice} from '../../services/selectors';
import { addBun, addIngredient, moveIngredient, deleteIngredient} from '../../services/actions/burger-constructor.js';

const BurgerConstructor = () => {

    const dispatch = useDispatch();

    const bun = useSelector(getBurgerBun);
    const ingredients = useSelector(getBurgerIngredients);
    const totalPrice = useSelector(setTotalPrice);

    const [ orderDetails, setOrderDetails] = useState(null);
    const { isModalOpen, openModal, closeModal } = useModal(false);
    const [ isLoading, setLoading ] = useState(false);
    const [ isError, setError ] = useState(false);

    const [, dropRef] = useDrop({
        accept: "ingredient",
        drop(ingredient) {
            if (ingredient.type === 'bun') {
                dispatch(addBun(ingredient));
            } else {
                dispatch(addIngredient(ingredient));
            }
        }
    });



    const onCreateOrder = () => {

        const ids = [
            bun._id,
            ...ingredients.map((item) => item._id),
            bun._id,
        ];

        setLoading(true);
        openModal();

        const sendOrder = async ( data ) => {
            try {
                const result = await createOrder( data );
                if(result.success) {
                    setOrderDetails(result.order);                                       
                } else {
                    setError('Произошла ошибка при создании заказа');                
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false);
            }
        }

        sendOrder(ids);
    };

    const renderItem = useCallback((ingredient, index) => {
        
        const moveItem = (dragIndex, hoverIndex) => {
            dispatch(moveIngredient(dragIndex, hoverIndex));
        }
    
        const deleteItem = (uuid) => {
            dispatch(deleteIngredient(uuid));
        }

        return (
            <div key={ingredient.uuid}>
                <DraggableItem index={index} moveElement={moveItem} className={styles.order_item + ' mr-2'}>
                    <DragIcon type="primary"/>
                    <ConstructorElement
                        text={ingredient.name}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                        handleClose={() => deleteItem(ingredient.uuid)}
                    />
                </DraggableItem>
            </div>
        )
    },[dispatch]);
    
    return (

        <section className='mt-25 pb-13 pl-4'>
            <div ref={dropRef} className={styles.constructor + ' pb-4 pt-4'}>

                {bun && (
                <div className={styles.order_items + ' mt-2 mb-2 pl-4'}>
                    <div className = {styles.order_item + ' ml-6 mr-2'}>
                        <ConstructorElement 
                            text = {bun.name + '(верх)'}
                            price = {bun.price} 
                            thumbnail = {bun.image} 
                            isLocked = {true}
                            type = "top"
                        />
                    </div>
                </div>
                )}          

                <div className={styles.order_items_scroll + ' pl-4'}>
                    {ingredients.map(((ingredient, index) => {                        
                        return renderItem(ingredient, index)
                    }))}
                </div>

                {bun && (
                <div className={styles.order_items + ' mt-2 mb-2 pl-4'}>
                    <div className = {styles.order_item + ' ml-6 mr-2'}>
                        <ConstructorElement 
                            text = {bun.name + ' (низ)'}
                            price = {bun.price} 
                            thumbnail = {bun.image} 
                            isLocked = {true}
                            type = "bottom"
                        />
                    </div>
                </div>     
            )}   

            </div>             

            <div className={styles.order_footer + ' mt-10 mr-4'}>
                <span className={styles.order_total + ' text text_type_digits-medium mr-10'}>
                    {totalPrice}
                    <CurrencyIcon type="primary" className="text text_type_digits-medium"/>
                </span>
                <Button htmlType="button" type="primary" size="large" onClick={() => onCreateOrder()} disabled={(!bun || ingredients.length === 0)}>Оформить заказ</Button>
            </div>

            {isLoading ? 
                (
                <Modal title = "Ваш заказ создается..." onClose = { closeModal } >
                    <div className={styles.order_loading}><img src={loaderImg} alt="loader" align="center" /></div>
                </Modal> 
                ) : 
            orderDetails && isModalOpen ? 
                (
                <Modal onClose = { closeModal }>
                    <OrderDetails order = {orderDetails} />
                </Modal> 
                ) :
            isError && (
                <Modal onClose = { closeModal }>
                    <div className={styles.order_loading}>{isError}</div>
                </Modal>              
            )}

        </section>

    );    
}

export default BurgerConstructor;