import { loadIngredients } from '../../utils/api';
import { IngredientType } from '../../types/types';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

// interfaces

export interface IGetAllIngredientsRequest {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetAllIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly payload: Array<IngredientType>;
}

export interface IGetAllIngredientsFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED;
    readonly payload: string;
}

export type BurgerIngredientsActionsType = 
    | IGetAllIngredientsRequest
    | IGetAllIngredientsSuccess
    | IGetAllIngredientsFailed;

// actions

export const getAllIngredients = () => {
    return (dispatch: any) => {
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
        .catch((err) => {
            dispatch({
                type: GET_INGREDIENTS_FAILED,
                payload: err
            })
        })
    }
}
