import type { ThunkDispatch } from 'redux-thunk';
import { TAuthActions } from '../services/actions/auth';
import { TBurgerConstructorActions } from '../services/actions/burger-constructor';
import { TBurgerIngredientsActions } from '../services/actions/burger-ingredients';
import { TIngredientActions } from '../services/actions/ingredient-details';
import { TOrderActions } from '../services/actions/order-details';
import { rootReducer } from '../services/';

type TAppActions =
  | TAuthActions
  | TBurgerConstructorActions
  | TBurgerIngredientsActions
  | TIngredientActions
  | TOrderActions;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TAppActions>;