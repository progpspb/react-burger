import { 
  ADD_BUN, 
  ADD_INGREDIENT, 
  MOVE_INGREDIENT, 
  DELETE_INGREDIENT, 
  CLEAR_CONSTRUCTOR,
  TBurgerConstructorActions
} from '../actions/burger-constructor';
import { TIngredient } from '../../types/types';

const initialState = {
  bun: null,
  ingredients: []
}

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorActions) => {
    switch (action.type) {
      case ADD_BUN: {
        return { 
          ...state,
          bun: action.payload
        }
      }      
      case ADD_INGREDIENT: {
        return { 
          ...state,
          ingredients: [...state.ingredients, action.payload]
        }
      }        
      case MOVE_INGREDIENT: {     
        const ingredients = [...state.ingredients];
        ingredients.splice(action.payload.hoverIndex, 0, ingredients.splice(action.payload.dragIndex, 1)[0]);
        return {
            ...state,
            ingredients: ingredients
        }
      }
      case DELETE_INGREDIENT: {
        return { 
          ...state, 
          ingredients: state.ingredients.filter((ingredient: TIngredient) => ingredient.uuid !== action.payload.uuid)
        }
      }
      case CLEAR_CONSTRUCTOR: {
        return { 
          ...initialState
        }
      }
      default:
        return state;
    }
}