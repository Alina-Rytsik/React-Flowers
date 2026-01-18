import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Функция для получения данных профиля по токену
  const getUserProfile = async (token) => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/profile/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (error) {
      localStorage.removeItem('token'); // Если токен протух
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Проверяем токен при загрузке сайта
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_token'); // на всякий случай, если есть дубли

    setUser(null);
    console.log('Вы вышли из системы');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, getUserProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
