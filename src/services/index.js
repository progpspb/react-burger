import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './reducers/burger-constructor.js';
import { burgerIngredientsReducer } from './reducers/burger-ingredients.js';
import { ingredientDetailsReducer } from './reducers/ingredient-details.js';
import { orderDetailsReducer } from "./reducers/order-details.js";
import { authUserReducer } from './reducers/auth.js';

export const rootReducer = combineReducers({
    burger: burgerConstructorReducer,    
    ingredients: burgerIngredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    order: orderDetailsReducer,
    auth: authUserReducer
});