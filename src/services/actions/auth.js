import { sendRequest } from '../../utils/api';
import { login, register, logout, forgotPassword, resetPassword, getUser, fetchWithRefresh } from '../../utils/auth';

export const SET_USER_REQUEST = 'SET_USER_REQUEST';
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const SET_USER_FAILED = 'SET_USER_FAILED';
export const SET_AUTHORIZED = 'SET_AUTHORIZED';

export const setAuthorized = (isAuth) => {
  return {
    type: SET_AUTHORIZED,
    payload: isAuth
  };
};

export const authLogin = (email, password) => {
  return (dispatch) => {
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

export const authRegister = (email, password, name) => {
  return (dispatch) => {
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
  return (dispatch) => {
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

export const authForgotPassword = (email) => {
  return (dispatch) => {
    forgotPassword(email);
  }
};

export const authResetPassword = (values) => {
  return (dispatch) => {
    resetPassword(values);
  }
};

export const authRefreshToken = () => {
  const token = localStorage.getItem('refreshToken');
  return sendRequest('/auth/token', { body: { token } });
};

export const authGetUser = () => {
  const accessToken = localStorage.getItem('accessToken');
  const headers = { Authorization: accessToken };
  return (dispatch) => fetchWithRefresh('/auth/user', { headers, method: 'GET' });
};

export const authUpdateUser = (values) => {
  const accessToken = localStorage.getItem('accessToken');
  const headers = { Authorization: accessToken };
  return (dispatch) => fetchWithRefresh('/auth/user', { headers, method: 'PATCH', body: values });
};

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUser())
        .then((res) => {
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