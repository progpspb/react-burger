// @ts-nocheck

export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';

export const setIngredientDetails = (ingredient) => {
    return {
        type: SET_INGREDIENT_DETAILS,
        payload: ingredient
    }
}