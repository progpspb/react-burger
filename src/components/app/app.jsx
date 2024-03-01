import { useState, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngredients } from '../../utils/api';
import { IngredientsContext } from '../../services/ingredients-context';

const App = () => {    

    const [ ingredients, setIngredients ] = useState([]);
    const [ isLoading, setLoading ] = useState(true);
   
    useEffect(() => {
        const fetchIngredientsData = async () => {
            try {
                const result = await getIngredients();
                setIngredients(result.data);
                setLoading(false);
            } catch (error) {
                console.error(error)
            }
        }
        fetchIngredientsData();
    },[]);

    return (
        <>
            <AppHeader />
            <main className={styles.main}>
            {!isLoading && (
                <IngredientsContext.Provider value = {ingredients}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </IngredientsContext.Provider>
            )}
            </main>
        </>
    );
}

export default App;
