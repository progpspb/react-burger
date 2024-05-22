import { loadIngredients } from '../../utils/api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const GET_BUNS = 'GET_BUNS';
export const GET_ITEMS = 'GET_ITEMS';
export const GET_SAUCES = 'GET_SAUCES';

export const getAllIngredients = () => {
    return (dispatch) => {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        })
        loadIngredients()
        .then((res) => {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                payload: res.data
            })
        })
        .catch((error) => {
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
        })
    }
}
