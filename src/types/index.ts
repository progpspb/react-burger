import type { ThunkDispatch } from 'redux-thunk';
import { TAuthActions } from '../services/actions/auth';
import { TBurgerConstructorActions } from '../services/actions/burger-constructor';
import { TBurgerIngredientsActions } from '../services/actions/burger-ingredients';
import { TIngredientActions } from '../services/actions/ingredient-details';
import { TOrderActions } from '../services/actions/order-details';
import { rootReducer } from '../services/';
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export type TAppActions =
  | TAuthActions
  | TBurgerConstructorActions
  | TBurgerIngredientsActions
  | TIngredientActions
  | TOrderActions;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TAppActions>;
