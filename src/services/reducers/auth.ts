// @ts-nocheck

import { SET_USER_REQUEST, SET_USER_SUCCESS, SET_USER_FAILED, SET_AUTHORIZED } from '../actions/auth';

const initialState = {
    user: null,
    isAuthorized: false,
    isLoading: false,
    isError: false,
    errMessage: ''
};

export const authUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_REQUEST: {
        return { ...state, isLoading: true };
    }
    case SET_USER_SUCCESS: {
        return { ...state, user: action.payload, isLoading: false, errMessage: '' };
    }
    case SET_USER_FAILED: {
        return { ...state, user: null, isLoading: false, isError: true, errMessage: action.payload };
    }
    case SET_AUTHORIZED: {
        return { ...state, isAuthorized: true };
    }    
    default:
        return state;
  }
};