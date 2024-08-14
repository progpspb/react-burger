import { RootState } from '../types/index';
import { TIngredient, TUser, TOrderDetails } from '../types/types';

// BurgerIngredients
export const getIngredients = (state: RootState) : Array<TIngredient> => state.ingredients.ingredients;
export const getIngredientsLoading = (state: RootState) : boolean => state.ingredients.isLoading;
export const getIngredientsError = (state: RootState) : boolean => state.ingredients.isError;

// BurgerConstructor
export const getBurgerBun = (state: RootState) : TIngredient => state.burger.bun;
export const getBurgerIngredients = (state: RootState) : Array<TIngredient> => state.burger.ingredients;

export const setTotalPrice = (state: RootState) : number => {
    const bun = state.burger.bun;    
    const bunPrice = bun ? bun.price * 2 : 0;
    // @ts-ignore
    return state.burger.ingredients.reduce((acc, item: TIngredient) => {
        return acc + item.price;
    }, bunPrice);
}

// User
export const getUser = (state: RootState) : TUser => state.auth.user;
export const isAuthorized = (state: RootState) : boolean => state.auth.isAuthorized;
export const authIsLoading = (state: RootState) : boolean => state.auth.isLoading;
export const authError = (state: RootState) : boolean => state.auth.isError;
export const authErrMessage = (state: RootState) : string => state.auth.errMessage;

// Order
export const getOrderDetails = (state: RootState) : any => state.order.orderDetails;
export const orderIsLoading = (state: RootState) : boolean => state.order.isLoading;
export const orderError = (state: RootState) : boolean => state.order.isError;
export const orderErrMessage = (state: RootState) : string => state.order.errMessage;