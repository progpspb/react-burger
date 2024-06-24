import { login, register, logout, getUserData, updateUserData } from '../../utils/auth';
import { TUser } from '../../types/types';

export const SET_USER_REQUEST: 'SET_USER_REQUEST' = 'SET_USER_REQUEST';
export const SET_USER_SUCCESS: 'SET_USER_SUCCESS' = 'SET_USER_SUCCESS';
export const SET_USER_FAILED: 'SET_USER_FAILED' = 'SET_USER_FAILED';
export const SET_AUTHORIZED: 'SET_AUTHORIZED' = 'SET_AUTHORIZED';

// interfaces

export interface ISetAuthorized {
  readonly type: typeof SET_AUTHORIZED;
  readonly payload: boolean;
}

export interface IAuthRequest {
  readonly type: typeof SET_USER_REQUEST;
}

export interface IAuthSuccess {
  readonly type: typeof SET_USER_SUCCESS;
  readonly payload: any;
}

export interface IAuthFailed {
  readonly type: typeof SET_USER_FAILED;
  readonly payload: any;
}

export type TAuthActions = 
  | ISetAuthorized
  | IAuthRequest
  | IAuthSuccess
  | IAuthFailed;

// actions

export const setAuthorized = (isAuth: boolean): ISetAuthorized => {
  return {
    type: SET_AUTHORIZED,
    payload: isAuth
  };
};

export const authLogin = (email: string, password: string) => {
  return (dispatch: any) => {
    dispatch({
        type: SET_USER_REQUEST
    })
    login(email, password)
    .then((res) => {
        dispatch({
            type: SET_USER_SUCCESS,
            payload: res.user
        });
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
    })
    .catch((error) => {
        dispatch({
            type: SET_USER_FAILED,
            payload: error.message
        })
    })
  }
};

export const authRegister = (email: string, password: string, name: string) => {
  return (dispatch: any) => {
    dispatch({
        type: SET_USER_REQUEST
    })
    register(email, password, name)
    .then((res) => {
        dispatch({
            type: SET_USER_SUCCESS,
            payload: res.user
        });
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
    })
    .catch((error) => {
        dispatch({
            type: SET_USER_FAILED,
            payload: error.message
        })
    })
  }
};

export const authLogout = () => {
  return (dispatch: any) => {
    dispatch({
      type: SET_USER_REQUEST
    })
    logout()
    .then(() => {
      dispatch({
        type: SET_USER_SUCCESS,
        payload: null
      });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(setAuthorized(false));
    })
    .catch((error) => {
      dispatch({
          type: SET_USER_FAILED,
          payload: error.message,
      })
    })
  }
};

export const getUser = () => {
  return (dispatch: any) => {
    dispatch({
      type: SET_USER_REQUEST
    })
    getUserData()
    .then((res) => {
      dispatch({
        type: SET_USER_SUCCESS,
        payload: res.user,
      })
      dispatch(setAuthorized(true));
    })
    .catch((error) => {
      dispatch({
          type: SET_USER_FAILED,
          payload: error.message,
      })
      dispatch(setAuthorized(false));
    })
  }
};

export const authUpdateUser = (newValues: TUser) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_USER_REQUEST
    })
    updateUserData(newValues)
    .then((res) => {
      dispatch({
        type: SET_USER_SUCCESS,
        payload: res.user,
      })
    })
    .catch((error) => {
      dispatch({
          type: SET_USER_FAILED,
          payload: error.message,
      })
    })
  }
};

export const checkUserAuth = () => {
  return (dispatch: any) => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUserData())
        .then((res: any) => {
          dispatch(setAuthorized(true));
        })
        .catch(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          dispatch(setAuthorized(false));
        })
        .finally(() => dispatch(setAuthorized(true)));
    } else {
      dispatch(setAuthorized(true));
    }
  };
};