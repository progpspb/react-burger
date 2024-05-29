import { SET_USER_REQUEST, SET_USER_SUCCESS, SET_USER_FAILED, SET_USER, SET_AUTHORIZED  } from '../actions/auth';

const initialState = {
    user: null,
    isAuthorized: false
};

export const authUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_REQUEST: {
        return state;
    }
    case SET_USER_SUCCESS: {
        return { ...state, user: action.payload };
    }
    case SET_USER_FAILED: {
        return { ...state, user: null };
    }
    case SET_USER: {
        return { ...state, user: action.payload };
    }
    case SET_AUTHORIZED: {
        return { ...state, isAuthorized: true };
    }    
    default:
        return state;
  }
};