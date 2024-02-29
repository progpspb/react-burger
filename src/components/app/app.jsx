import {useState, useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngredients } from '../../utils/api';

const App = () => {    

    const [ingredients, setIngredients] = useState([]);
    
    useEffect(() => {
        const fetchIngredientsData = async () => {
            try {
                const result = await getIngredients();
                setIngredients(result.data);
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
                <BurgerIngredients ingredients = {ingredients}/>
                <BurgerConstructor ingredients = {ingredients} />
            </main>
        </>
    );
}

export default App;
