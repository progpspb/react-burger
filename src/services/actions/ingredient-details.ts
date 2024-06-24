import { TIngredient } from '../../types/types';

export const SET_INGREDIENT_DETAILS: 'SET_INGREDIENT_DETAILS' = 'SET_INGREDIENT_DETAILS';

// interfaces

export interface ISetIngredientDetails {
    readonly type: typeof SET_INGREDIENT_DETAILS;
    readonly payload: TIngredient;
}

export type TIngredientActions = ISetIngredientDetails;

// actions

export const setIngredientDetails = (ingredient: TIngredient): ISetIngredientDetails => {
    return {
        type: SET_INGREDIENT_DETAILS,
        payload: ingredient
    }
}