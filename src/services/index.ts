import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './reducers/burger-constructor';
import { burgerIngredientsReducer } from './reducers/burger-ingredients';
import { ingredientDetailsReducer } from './reducers/ingredient-details';
import { orderDetailsReducer } from "./reducers/order-details";
import { authUserReducer } from './reducers/auth';

export const rootReducer = combineReducers({
    burger: burgerConstructorReducer,    
    ingredients: burgerIngredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    order: orderDetailsReducer,
    auth: authUserReducer
});