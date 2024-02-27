import React from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data';

const BurgerConstructor = () => {

    const items = [
        '60666c42cc7b410027a1a9b5',
        '60666c42cc7b410027a1a9b9',
        '60666c42cc7b410027a1a9bb',
        '60666c42cc7b410027a1a9be',
        '60666c42cc7b410027a1a9b2',
        '60666c42cc7b410027a1a9b2',
        '60666c42cc7b410027a1a9b2',
        '60666c42cc7b410027a1a9b2',                        
    ];

    return (
        <section>            
            <div className={styles.order_items + ' pl-4'}>

                <ConstructorElement 
                    type="top" 
                    isLocked={true} 
                    text="Краторная булка N-200i (верх)" 
                    price={200} 
                    thumbnail={data[0].image} 
                />

                {items.map((item,index) => {
                    const [current] = data.filter((element) => element._id === item);
                    return (
                        <div key={index} className={styles.order_item + ' mr-2'}>
                            <DragIcon type="primary" />
                            <ConstructorElement text={current.name} price={current.price} thumbnail={current.image} key={item} />
                        </div>
                    );
                })}

                <ConstructorElement 
                    type="bottom" 
                    isLocked={true} 
                    text="Краторная булка N-200i (низ)" 
                    price={200} 
                    thumbnail={data[7].image} 
                />

            </div>

            <div className={styles.order_footer + ' mt-10 mr-4'}>
                <span className={styles.order_total + ' text text_type_digits-medium mr-10'}>
                    {1500}
                    <CurrencyIcon type="primary" className="text text_type_digits-medium"/>
                </span>
                <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
            </div>

        </section>
    );    
}

export default BurgerConstructor;