import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Grazie al proxy in vite.config.js, questo punterà a http://localhost:8000/api
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true, // Necessario se userai Sanctum per l'autenticazione
});

export default api;
