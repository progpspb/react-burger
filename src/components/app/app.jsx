import React from 'react';
import style from './app.module.css';
import { Logo, Icons, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import testData from '../../utils/data';

const App = (props) => {
    return (
        <>
            <AppHeader />
            <main>
				<BurgerIngredients data={testData} />
				<BurgerConstructor data={testData} />
			</main>
        </>
    );
}

export default App;
