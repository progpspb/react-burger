import { sendRequest } from '../../utils/api';
import { login, register, logout, forgotPassword, resetPassword, getUser, fetchWithRefresh } from '../../utils/auth';

export const SET_USER_REQUEST = 'SET_USER_REQUEST';
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const SET_USER_FAILED = 'SET_USER_FAILED';

export const SET_USER = 'SET_USER';
export const SET_AUTHORIZED = 'SET_AUTHORIZED';

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const setAuthorized = (isAuth) => {
  return {
    type: SET_AUTHORIZED,
    payload: isAuth,
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
        localStorage.removeItem('resetPassword');
    })
    .catch((error) => {
        dispatch({
            type: SET_USER_FAILED,
            payload: error
        })
    })
  }
};

export const authRegister = (values) => {
  return (dispatch) => {
    dispatch({
        type: SET_USER_REQUEST
    })
    register(values)
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
            payload: error
        })
    })
  }
};

export const authLogout = () => {
  return (dispatch) => {
    logout()
    .then(() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(setUser(null));
    });
  };
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
          dispatch(setUser({ ...res.user, password: '' }));
        })
        .catch(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthorized(true)));
    } else {
      dispatch(setAuthorized(true));
    }
  };
};