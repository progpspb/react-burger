export const getIngredients = async () => {

    const apiUrl = "https://norma.nomoreparties.space/api/ingredients";

    return fetch(apiUrl)
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