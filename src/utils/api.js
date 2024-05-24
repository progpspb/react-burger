const apiUrl = "https://norma.nomoreparties.space/api";

export const loadIngredients = async () => {
    return sendRequest('/ingredients');
}

export const createOrder = async (orderDetails) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify( {'ingredients': orderDetails} )
    };
    return sendRequest('/orders', options);
}

export const sendRequest = (endpoint, options = null) => {

    const url = apiUrl + endpoint;

    return fetch(url, options)
        .then(response => { 
            if (!response.ok) {
                return Promise.reject(`Ошибка: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return data;
        });

}