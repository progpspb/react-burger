import { ReactElement } from "react";

export type IngredientType = {
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

export type DraggableItemType = {
    children: any;
    index: number;
    moveElement: any;
    className: string;
};

export type ProtectedRouteType = {
    component: ReactElement;
    needAuth: boolean;
};

export type OrderDetailsType = {
    order: { number: number };
};

export type ModalType = {
    title: string;    
    children: any,
    onClose: void,
};