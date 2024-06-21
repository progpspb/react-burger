// @ts-nocheck

import { createOrder } from '../../utils/api';

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';

export const sendOrderDetails = (orderDetails) => {
    return (dispatch) => {
        dispatch({
            type: SEND_ORDER_REQUEST
        })
        createOrder(orderDetails)
        .then((res) => {
            dispatch({
                type: SEND_ORDER_SUCCESS,
                payload: res
            })
        })
        .catch((error) => {
            dispatch({
                type: SEND_ORDER_FAILED
            })
        })
    }
}