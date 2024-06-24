import { v4 as uuidv4 } from 'uuid';
import { TIngredient } from '../../types/types';

export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';

// interfaces

export interface IAddBun {
    readonly type: typeof ADD_BUN;
    readonly payload: any;
}

export interface IAddIngredient {
    readonly type: typeof ADD_INGREDIENT;
    readonly payload: any;
}

export interface IDeleteIngredient {
    readonly type: typeof DELETE_INGREDIENT;
    readonly payload: any | never;
}

export interface IMoveIngredient {
    readonly type: typeof MOVE_INGREDIENT;
    readonly payload: any;
}

export interface IClearConstructor {
    readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TBurgerConstructorActions = 
    | IAddBun
    | IAddIngredient
    | IDeleteIngredient
    | IMoveIngredient
    | IClearConstructor;

// actions

export const addBun = (bun: TIngredient) : IAddBun => {
    return { 
        type: ADD_BUN, 
        payload: { ...bun, uuid: uuidv4() }
    }
}

export const addIngredient = (ingredient: TIngredient) : IAddIngredient => {
    return { 
        type: ADD_INGREDIENT, 
        payload: { ...ingredient, uuid: uuidv4() }
    }
}

export const deleteIngredient = (uuid: string) : IDeleteIngredient => {
    return { 
        type: DELETE_INGREDIENT, 
        payload: { uuid }
    }
}

export const moveIngredient = (dragIndex: number, hoverIndex: number) : IMoveIngredient => {
    return { 
        type: MOVE_INGREDIENT, 
        payload: { dragIndex, hoverIndex } 
    }
};

export const clearConstructor = () : IClearConstructor => {
    return { type: CLEAR_CONSTRUCTOR };
}