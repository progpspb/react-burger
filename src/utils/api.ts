import { IngredientType } from '../types/types';

export const BURGER_API_URL = "https://norma.nomoreparties.space/api";

// получение списка ингредиентов

export const loadIngredients = async () => {
    return sendRequest('/ingredients');
}

// создание заказов

export const createOrder = async (orderDetails: Array<IngredientType>) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({ 'ingredients': orderDetails })
    };
    return sendRequest('/orders', options);
}

// общие функции

export const checkReponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const sendRequest = (endpoint: string, options?: any) => {
    return fetch(`${BURGER_API_URL}${endpoint}`, options)
        .then(checkReponse)
        .then(data => {
            return data;
        });
}