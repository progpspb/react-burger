import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data';

const BurgerIngredients = () => {

    const [current, setCurrent] = React.useState('buns');

    const bun = React.useMemo(() => data.filter(item => item.type === 'bun'), [data]);
    const sauce = React.useMemo(() => data.filter(item => item.type === 'sauce'), [data]); 
    const main = React.useMemo(() => data.filter(item => item.type === 'main'), [data]);     

    const ingredients = [
        {name:'Булки',type:'bun','items':bun}, 
        {name:'Соусы',type:'sauce','items':sauce}, 
        {name:'Начинки',type:'main','items':main}
    ]; 

    return (
        <section>
            <h1 className={'text text_type_main-large mt-10 mb-5'}>Соберите бургер</h1>
            <div className={styles.tabs}>
            {ingredients.map((ingredient) => {
                return (
                    <>
                    <Tab value={ingredient.type} active={current === ingredient.type} onClick={setCurrent}>{ingredient.name}</Tab>
                    </>
                )
            })}
            </div>
            <div className={styles.tab_scroll + ' pb-10'}>
                {ingredients.map((ingredient) => {
                    return (
                        <>
                        <h2 id={ingredient.type} className='text text_type_main-large mt-10 mb-5'>{ingredient.name}</h2>
                        <div className={styles.items}>
                        {ingredient.items.map((item, index) => {
                            return (
                                <div className={styles.item} key={index}>
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
   );      
}

export default BurgerIngredients;