const BURGER_API_URL = "https://norma.nomoreparties.space/api";

export const loadIngredients = async () => {
    return sendRequest('/ingredients');
}

export const createOrder = async (orderDetails) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({ 'ingredients': orderDetails })
    };
    return sendRequest('/orders', options);
}

export const authLogin = async (email, password) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({ 'email': email, 'password': password })
    };
    return sendRequest('/auth/login', options);
}

export const authRegister = async (email, password, name) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({ 'email': email, 'password': password, 'name': name })
    };
    return sendRequest('/auth/register', options);
}

export const forgotPassword = async (email) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({ 'email': email })
    };
    return sendRequest('/password-reset', options);
}

export const passwordReset = async (password, token) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({ 'password': password, 'token': token })
    };
    return sendRequest('/password-reset/reset', options);
}

export const authRefreshToken = async () => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    };
    return sendRequest('/auth/token', options);
}

export const authLogout = async () => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    };
    return sendRequest('/auth/logout', options);
}

export const authUser = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem('accessToken')
        }
    };
    return sendRequest('/auth/user', options);
}

export const authUserUpdate = async (data) => {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem('accessToken')
        },
        body: JSON.stringify({ data })
    };
    return sendRequest('/auth/user', options);
}

export const sendRequest = (endpoint, options = null) => {

    return fetch(`${BURGER_API_URL}${endpoint}`, options)
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

// пример от куратора
const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
  
export const refreshToken = () => {
    return fetch(`${BURGER_API_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    })
    .then(checkReponse)
     // !! Важно для обновления токена в мидлваре, чтобы запись
     // была тут, а не в fetchWithRefresh
    .then((refreshData) => {
        if (!refreshData.success) {
            return Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken); 
        localStorage.setItem("accessToken", refreshData.accessToken);
        return refreshData;
    });
};
  
export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkReponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(); //обновляем токен
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options); //повторяем запрос
            return await checkReponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};