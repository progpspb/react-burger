import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selctorHook
} from 'react-redux';
import {AppDispatch, RootState} from '../types';

export const useSelector: TypedUseSelectorHook<RootState> = selctorHook;
export const useDispatch = () => dispatchHook<AppDispatch>();