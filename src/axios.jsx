import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

// 1. Interceptor de ENTRADA (Request): Envia o token
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 2. Interceptor de SAÍDA (Response): Vigia erros 403
api.interceptors.response.use(
    response => response, // Se a resposta for sucesso, não faz nada
    error => {
        // Se o servidor responder 403 (Proibido) ou 401 (Não autorizado)
        if (error.response && (error.response.status === 403 || error.response.status === 401)) {
            console.warn("Token inválido ou expirado. Limpando acesso...");
            localStorage.clear(); // Limpa tudo

            // Redireciona para a raiz (que vai carregar o login no seu App.js)
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default api;