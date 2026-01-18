import React, { useState,useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Для вывода ошибок на экран

  const navigate = useNavigate();
  const { getUserProfile } = useContext(AuthContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Сбрасываем старую ошибку
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password,
      });

      const token = response.data.access;

      // Сохраняем токены
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      // Сразу вызываем функцию загрузки профиля, чтобы Хедер и Личный кабинет получили данные юзера
      await getUserProfile(token);
      navigate('/account'); // Переходим в кабинет

    } catch (error) {
      console.error("Ошибка входа", error);
      setError('Неверный логин или пароль'); // Выводим текст для пользователя
    }
  };

  return (
    <div className="login">
      <img src="/img/lavender.png" alt="lavender" />

      <div className='box'>
        
        <h1>Вход</h1>
        {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Логин"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
          />
          <button type="submit">Войти</button>
        </form>
        
          <Link to="/register">Зарегистироваться</Link>
          <Link to="#">Забыли пароль?</Link>    
      </div>
   </div>
 );
}

export default Login;