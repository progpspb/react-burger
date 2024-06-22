import { 
    SET_INGREDIENT_DETAILS, 
    IngredientActionsType 
} from '../actions/ingredient-details';

const initialState = null;

export const ingredientDetailsReducer = (state = initialState, action: IngredientActionsType) => {
    switch (action.type) {
        case SET_INGREDIENT_DETAILS:
            return action.payload;
        default:
            return state;
    }
}