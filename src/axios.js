import axios from 'axios';

// Настройка базового URL
const instance = axios.create({
  baseURL: 'http://localhost:8000',
});

// Интерцептор запроса: добавляем токен в каждый запрос
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Исправлено: используем обратные кавычки
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Интерцептор ответа: ловим ошибку 401 (неавторизован)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Токен истек, выходим...');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default instance;
