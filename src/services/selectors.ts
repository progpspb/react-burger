import { RootState } from '../types/index';
import { IngredientType } from '../types/types';

// BurgerIngredients
export const getIngredients = (state: RootState) => state.ingredients.ingredients;
export const getIngredientsLoading = (state: RootState) => state.ingredients.isLoading;
export const getIngredientsError = (state: RootState) => state.ingredients.isError;

// BurgerConstructor
export const getBurgerBun = (state: RootState) => state.burger.bun;
export const getBurgerIngredients = (state: RootState) => state.burger.ingredients;

export const setTotalPrice = (state: RootState) => {
    const bun = state.burger.bun;    
    const bunPrice = bun ? bun.price * 2 : 0;
    // @ts-ignore
    return state.burger.ingredients.reduce((acc, item: IngredientType) => {
        return acc + item.price;
    }, bunPrice);
}

// User
export const getUser = (state: RootState) => state.auth.user;
export const isAuthorized = (state: RootState) => state.auth.isAuthorized;
export const authIsLoading = (state: RootState) => state.auth.isLoading;
export const authError = (state: RootState) => state.auth.isError;
export const authErrMessage = (state: RootState) => state.auth.errMessage;