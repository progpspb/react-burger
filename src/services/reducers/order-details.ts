// @ts-nocheck

import { SEND_ORDER_REQUEST, SEND_ORDER_SUCCESS, SEND_ORDER_FAILED } from '../actions/order-details';

const initialState = {
    orderDetails: null,
    isLoading: false,    
    isError: false
};

export const orderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_ORDER_REQUEST: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case SEND_ORDER_SUCCESS: {
            return { 
                ...state,
                orderDetails: action.payload,
                isLoading: false,
                isError: false
            }
        }
        case SEND_ORDER_FAILED: {
            return { 
                ...initialState, 
                isError: true 
            }
        }
        default:
            return state;
    }
}