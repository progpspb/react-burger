import { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsLoading, getIngredientsError } from '../../services/selectors';
import { getAllIngredients } from '../../services/actions/burger-ingredients.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {

    const isLoading = useSelector(getIngredientsLoading);
    const isError = useSelector(getIngredientsError);
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( getAllIngredients() );
    }, [ dispatch ]);

    return (
        <>
            <AppHeader />
            <main className={styles.main}>
                {!isError && !isLoading ? (
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </DndProvider>
                ) : (
                    <p>{isError ? 'Произошла ошибка загрузки данных' : 'Загрузка данных'}</p>
                )}                
            </main>
        </>
    )
}

export default App;
