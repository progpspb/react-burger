import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED} from '../actions/burger-ingredients';

const initialState = {
    buns: [],
    ingredients: [],
    isLoading: false,  
    isError: false
};

export const burgerIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return { 
                ...state,
                ingredients: action.payload,
                isLoading: false,
                isError: false
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return { 
                ...initialState, 
                isError: true 
            }
        }
        default: {
            return state;
        }
    }
}