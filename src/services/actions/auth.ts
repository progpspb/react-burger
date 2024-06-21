import { login, register, logout, getUserData, updateUserData } from '../../utils/auth';

export const SET_USER_REQUEST = 'SET_USER_REQUEST';
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const SET_USER_FAILED = 'SET_USER_FAILED';
export const SET_AUTHORIZED = 'SET_AUTHORIZED';

export const setAuthorized = (isAuth: boolean) => {
  return {
    type: SET_AUTHORIZED,
    payload: isAuth
  };
};

export const authLogin = (email: string, password: string)=> {
  return (dispatch : any) => {
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
  return (dispatch : any) => {
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
  return (dispatch : any) => {
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
  return (dispatch : any) => {
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

export const authUpdateUser = (newValues:any) => {
  return (dispatch : any) => {
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
  return (dispatch : any) => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUserData())
        .then((res : any) => {
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