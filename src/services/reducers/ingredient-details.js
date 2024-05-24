import { SET_INGREDIENT_DETAILS } from '../actions/ingredient-details';

const initialState = null;

export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INGREDIENT_DETAILS:
            return action.payload;
        default:
            return state;
    }
}