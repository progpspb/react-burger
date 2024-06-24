import { 
    SET_INGREDIENT_DETAILS, 
    TIngredientActions 
} from '../actions/ingredient-details';

const initialState = null;

export const ingredientDetailsReducer = (state = initialState, action: TIngredientActions) => {
    switch (action.type) {
        case SET_INGREDIENT_DETAILS:
            return action.payload;
        default:
            return state;
    }
}