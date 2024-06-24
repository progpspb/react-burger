import { useState, useMemo, useEffect } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from './ingredient/ingredient';
import { useSelector } from '../../hooks';
import { getIngredients } from '../../services/selectors';
import { TIngredient } from '../../types/types';

const BurgerIngredients = () => {
    
    const [ currentTab, setCurrentTab ] = useState<string>('bun');

    const ingredients = useSelector(getIngredients);

    const bun = useMemo(() => ingredients.filter((item: TIngredient) => item.type === 'bun'), [ingredients]);
    const sauce = useMemo(() => ingredients.filter((item: TIngredient) => item.type === 'sauce'), [ingredients]); 
    const main = useMemo(() => ingredients.filter((item: TIngredient) => item.type === 'main'), [ingredients]);

    const ingredientsCollection = useMemo(() => [
        {name:'Булки',type:'bun','items':bun}, 
        {name:'Соусы',type:'sauce','items':sauce}, 
        {name:'Начинки',type:'main','items':main}
    ], [bun, sauce, main]);

    const changeTab = (tab: string) => {
        setCurrentTab(tab);
        const scrollTab = document.getElementById(tab);
        if (scrollTab) {
            scrollTab.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const offsetTop = 300;
            ingredientsCollection.forEach((item) => {                
                const tab = document.getElementById(item.type) as HTMLElement;
                const pos = tab.getBoundingClientRect();
                if (pos.top <= offsetTop) setCurrentTab(item.type);
            });
        }
        const scrollTab = document.getElementById('scroll_tab') as HTMLElement;
        scrollTab.addEventListener('scroll', handleScroll);
        return () => {
            scrollTab.removeEventListener('scroll', handleScroll);
        };
    }, [ingredientsCollection]);

    return (

        <section>

            <h1 className = 'text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>

            <div className = {styles.tabs}>
                <Tab value='bun' active={currentTab === 'bun'} onClick={() => changeTab('bun')}>Булки</Tab>
                <Tab value='sauce' active={currentTab === 'sauce'} onClick={() => changeTab('sauce')}>Соусы</Tab>
                <Tab value='main' active={currentTab === 'main'} onClick={() => changeTab('main')}>Начинки</Tab>
            </div>

            <div id='scroll_tab' className={styles.tab_scroll + ' pb-10'}>
                {ingredientsCollection.map((collectionType, idx) => {
                    return (
                        <div id={collectionType.type} key = {idx}>
                            <h2 className='text text_type_main-large mt-10 mb-5'>{collectionType.name}</h2>
                            <div className={styles.items}>
                            {collectionType.items.map((item: TIngredient) => {
                                return (
                                    <Ingredient
                                        key = {item._id}                                       
                                        ingredient = {{...item}}
                                    />
                                )
                            })}
                            </div>
                        </div>
                    )
                })}
            </div>
           
        </section>
   );      
}

export default BurgerIngredients;