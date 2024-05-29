export const BURGER_API_URL = "https://norma.nomoreparties.space/api";

// получение списка ингредиентов

export const loadIngredients = async () => {
    return sendRequest('/ingredients');
}

// создание заказов

export const createOrder = async (orderDetails) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({ 'ingredients': orderDetails })
    };
    return sendRequest('/orders', options);
}

export const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const sendRequest = (endpoint, options = null) => {

    return fetch(`${BURGER_API_URL}${endpoint}`, options)
        .then(checkReponse)
        .then(data => {
            return data;
        });

}