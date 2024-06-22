import { IngredientType } from '../../types/types';

export const SET_INGREDIENT_DETAILS: 'SET_INGREDIENT_DETAILS' = 'SET_INGREDIENT_DETAILS';

// interfaces

export interface ISetIngredientDetails {
    readonly type: typeof SET_INGREDIENT_DETAILS;
    readonly payload: IngredientType;
}

export type IngredientActionsType = ISetIngredientDetails;

// actions

export const setIngredientDetails = (ingredient: IngredientType): ISetIngredientDetails => {
    return {
        type: SET_INGREDIENT_DETAILS,
        payload: ingredient
    }
}