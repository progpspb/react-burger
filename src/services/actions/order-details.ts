import { createOrder } from '../../utils/api';

export const SEND_ORDER_REQUEST: 'SEND_ORDER_REQUEST' = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS: 'SEND_ORDER_SUCCESS' = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED: 'SEND_ORDER_FAILED' = 'SEND_ORDER_FAILED';

// interfaces

export interface ISendOrderDetails {
    readonly type: typeof SEND_ORDER_REQUEST;
    readonly payload: boolean;
}

export interface IOrderRequest {
    readonly type: typeof SEND_ORDER_REQUEST;
}

export interface IOrderSuccess {
    readonly type: typeof SEND_ORDER_SUCCESS;
    readonly payload: number;
}
  
export interface IOrderFailed {
    readonly type: typeof SEND_ORDER_FAILED;
    readonly payload: string;
}
  
export type TOrderActions = 
    | IOrderRequest
    | IOrderSuccess
    | IOrderFailed;

// actions

export const sendOrderDetails = (orderDetails: Array<string>) => {
    return (dispatch:any) => {
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
        .catch((err) => {
            dispatch({
                type: SEND_ORDER_FAILED,
                payload: err
            })
        })
    }
}