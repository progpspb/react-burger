import { ReactElement } from "react";

export type TIngredient = {
    _id: string;
    name: string;
    image: string;
    type: string;
    price: number;
    calories: number;
    carbohydrates: number;
    proteins: number;
    fat: number;
    image_large: string;
    image_mobile: string;
    uuid: string;
};

export type TDraggableItem = {
    children: any;
    index: number;
    moveElement: any;
    className: string;
};

export type TProtectedRoute = {
    component: ReactElement;
    needAuth: boolean;
};

export type TOrderDetails = {
    order: { number: number };
};

export type TModal = {
    title: string;    
    children: any,
    onClose: void,
};

export type TUser = {
    name: string;
    email: string;
    password: string;
    code: string | undefined;
};

export type IMessageResponse = {
    message: string;
    success: boolean;
    username: string;  
    id?: string;
    isBot?: boolean;
};