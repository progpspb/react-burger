export const BURGER_API_URL = "https://norma.nomoreparties.space/api";

// получение списка ингредиентов

export const loadIngredients = async () => {
    return sendRequest('/ingredients');
}

// создание заказов

export const createOrder = async (orderDetails: Array<string>) => {
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

export const sendRequest = async (endpoint: string, options?: any) => {
    const res = await fetch(`${BURGER_API_URL}${endpoint}`, options);
    const data = await checkReponse(res);
    return data;
}