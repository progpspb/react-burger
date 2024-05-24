import { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsLoading, getIngredientsError } from '../../services/selectors';
import { getAllIngredients } from '../../services/actions/burger-ingredients.js';
import { HomePage, NotFoundPage, IngredientPage, LoginPage,  RegisterPage, ProfilePage, ForgotPassword, ResetPasswordPage } from '../../pages';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

function App() {

    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;
    
    const isLoading = useSelector(getIngredientsLoading);
    const isError = useSelector(getIngredientsError);
    const dispatch = useDispatch();

    const handleModalClose = () => {
        // Возвращаемся к предыдущему пути при закрытии модалки
        navigate(-1);
    };

    useEffect( () => {
        dispatch( getAllIngredients() );
    }, [ dispatch ]);

    return (
        <>
            <AppHeader />
            <main className={styles.container}>
            {!isError && !isLoading ? (
                <>
                <Routes location={background || location}>                
                    <Route path='/' element={<HomePage />} />
                    <Route path='*' element={<NotFoundPage />} />
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/register' element={<RegisterPage/>}/>
                    <Route path='/forgot-password' element={<ForgotPassword/>}/>
                    <Route path='/reset-password' element={<ResetPasswordPage/>}/>
                    <Route path='/profile' element={<ProfilePage/>}/>
                    <Route path='/ingredients/:id' element={<IngredientPage/>}/>      
                </Routes>           
            
                {background && (
                    <Routes>
                        <Route path='/ingredients/:id' element={
                            <Modal onClose={handleModalClose} title={"Детали ингредиента"}>
                                <IngredientDetails/>
                            </Modal>
                        }/>
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
