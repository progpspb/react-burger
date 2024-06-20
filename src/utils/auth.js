import { sendRequest } from "./api.js";

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
        body: JSON.stringify({'password': password, 'token': token})
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
    return sendWithRefresh('/auth/logout', options);
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
    return sendWithRefresh('/auth/user', options);
}

// обновление данных профиля

export const updateUserData = async (data) => {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem('accessToken')
        },
        body: JSON.stringify(data)
    };
    return sendWithRefresh('/auth/user', options);
}


// работа с токеном

export const refreshToken = async () => {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken")
        }),
    }    
    const refreshData = await sendRequest('/auth/token', options);
    if (!refreshData.success) {
        throw refreshData;
    }
    localStorage.setItem('refreshToken', refreshData.refreshToken);
    localStorage.setItem('accessToken', refreshData.accessToken);
    return refreshData;
}
  
export const sendWithRefresh = async (url, options) => {
    try {
        return await sendRequest(url, options);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(); //обновляем токен
            options.headers.authorization = refreshData.accessToken;
            return sendRequest(url, options); //повторяем запрос
        } else {
            return Promise.reject(err);
        }
    }
}