import { BURGER_API_URL, sendRequest, checkReponse } from "./api.js";

// авторизация

export const login = async (email, password) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({ 'email': email, 'password': password })
    };
    return sendRequest('/auth/login', options);
}

// регистрация

export const register = async (email, password, name) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({ 'email': email, 'password': password, 'name': name })
    };
    return sendRequest('/auth/register', options);
}

// напоминание пароля

export const forgotPassword = async (email) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({ 'email': email })
    };
    return sendRequest('/password-reset', options);
}

// сброс пароля

export const resetPassword = async (password, token) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({ 'password': password, 'token': token })
    };
    return sendRequest('/password-reset/reset', options);
}

// выход

export const logout = async () => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    };
    return sendRequest('/auth/logout', options);
}

// получение данных профиля

export const getUserData = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem('accessToken')
        }
    };
    return sendRequest('/auth/user', options);
}

// обновление данных профиля

export const updateUser = async (data) => {
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


// работа с токеном

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