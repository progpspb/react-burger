import type { Middleware, MiddlewareAPI } from 'redux';

import type {
    TAppActions,
    AppDispatch,
    RootState
} from '../../types';

/*
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

type TWSStoreActions = {
    wsInit: typeof  WS_CONNECTION_START,
    wsSendMessage: typeof  WS_SEND_MESSAGE,
    onOpen: typeof  WS_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED,
    onError: typeof  WS_CONNECTION_ERROR,
    onMessage: typeof  WS_GET_MESSAGE,
};
*/

export const socketMiddleware = (wsUrl: string, wsActions: any): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
  
        return next => (action: any) => {
            const { dispatch, getState } = store;
            const { type } = action;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
            const { user } = getState().auth.user;
            if (type === wsInit && user) {
                socket = new WebSocket(`${wsUrl}?token=${user.token}`);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };
  
                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };
  
                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData: any = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;
  
                    dispatch({ type: onMessage, payload: { ...restParsedData } });
                };
  
                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };
  
                if (type === wsSendMessage) {
                    const payload = action.payload as any;
                    payload.token = user.token;
                    socket.send(JSON.stringify(payload));
                }
            }
  
            next(action);
        };
    }) as Middleware;
};