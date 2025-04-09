import axios from 'axios';
import {
    BASE_URL,
} from "../params";

// Buat instance axios tanpa header Authorization
const Api = axios.create({
    baseURL: BASE_URL
});

// Menambahkan interceptor untuk menetapkan header Authorization
Api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default Api;