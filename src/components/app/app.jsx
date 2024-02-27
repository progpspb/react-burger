import {useState, useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const App = () => {

    const apiUrl = "https://norma.nomoreparties.space/api/ingredients";

    const [ingredients, setIngredients] = useState([]);

    const getIngredients = async () => {
        return fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(`Ошибка: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                return data;
            })
            .catch(error => console.log(error))
    }
    
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
    }, []);

    return (
        <>
            <AppHeader />
            <main className={styles.main}>
                <BurgerIngredients ingredients={ingredients}/>
                <BurgerConstructor ingredients={ingredients} />
            </main>
        </>
    );
}

export default App;
