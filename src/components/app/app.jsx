import { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsLoading, getIngredientsError } from '../../services/selectors';
import { getAllIngredients } from '../../services/actions/burger-ingredients.js';
import { MainPage, NotFoundPage, IngredientPage } from '../../pages';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

function App() {

    const location = useLocation();
    const navigate = useNavigate();
    
    const isLoading = useSelector(getIngredientsLoading);
    const isError = useSelector(getIngredientsError);
    const dispatch = useDispatch();

    const state = location.state;

    function closeModal() {
        navigate(-1);
    }

    useEffect( () => {
        dispatch( getAllIngredients() );
    }, [ dispatch ]);

    return (
        <>
            <AppHeader />
            <main className={styles.main}>
            {!isError && !isLoading ? (
                <>
                <Routes location={state?.backgroundLocation || location}>                
                    <Route path='/' element={<MainPage />} />
                    <Route path='*' element={<NotFoundPage />} />
                    <Route path='/ingredient/:id' element={<IngredientPage/>}/>      
                </Routes>           
            
                {state?.backgroundLocation && (
                    <Routes>
                        <Route path='/ingredient/:id' element={
                            <Modal onClose={closeModal} title={"Детали ингридиента"}>
                                <IngredientDetails/>
                            </Modal>}/>
                    </Routes>
                )}
                </>
            ) : (
                <p>{isError ? 'Произошла ошибка загрузки данных' : 'Загрузка данных'}</p>
            )}
            </main> 
        </>
    )
}

export default App;
