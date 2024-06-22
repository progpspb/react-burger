import type { ThunkDispatch } from 'redux-thunk';
import { AuthActionsType } from '../services/actions/auth';
import { BurgerConstructorActionsType } from '../services/actions/burger-constructor';
import { BurgerIngredientsActionsType } from '../services/actions/burger-ingredients';
import { IngredientActionsType } from '../services/actions/ingredient-details';
import { OrderActionsType } from '../services/actions/order-details';
import { rootReducer } from '../services/';

type AppActionsType =
  | AuthActionsType
  | BurgerConstructorActionsType
  | BurgerIngredientsActionsType
  | IngredientActionsType
  | OrderActionsType;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>;