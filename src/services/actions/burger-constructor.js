import { v4 as uuidv4 } from 'uuid';

export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export const addBun = (bun) => {
    return { 
        type: ADD_BUN, 
        payload: { ...bun, uuid: uuidv4() }
    }
}
export const addIngredient = (ingredient) => {
    return { 
        type: ADD_INGREDIENT, 
        payload: { ...ingredient, uuid: uuidv4() }
    }
}

export const deleteIngredient = (uuid) => {
    return { 
        type: DELETE_INGREDIENT, 
        payload: { uuid }
    }
}

export const moveIngredient = (dragIndex, hoverIndex) => {
    return { 
        type: MOVE_INGREDIENT, 
        payload: { dragIndex, hoverIndex } 
    }
};

export const clearConstructor = () => {
    return { type: CLEAR_CONSTRUCTOR };
}